// Setup .env file
import dotenv from 'dotenv'
dotenv.config()

// Import modules
import { Server } from 'socket.io'
import { connect as connect_db, connection as db_connection } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// DB connection
connect_db(<string>process.env.DATABASE_URL)
db_connection.on('error', (err: any) => console.log('db connection error:', err))

// Setup models
import { User, Chat, Message } from './models'
import type { IUser, IChat, IMessage } from './models'

// JWT tools
const SECRET_KEY = <string>process.env.SECRET_KEY
const generateToken = (data: object) => jwt.sign(data, SECRET_KEY)
const verifyToken = (token: string | string[]) => jwt.verify(<string>token, SECRET_KEY)

// Bcrypt tools
const hashPassword = (data: string) => bcrypt.hashSync(data, 10)
const comparePassword = (newPassword: string, realPassword: string) => bcrypt.compareSync(newPassword, realPassword)

// Socket server
const io = new Server({
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

type decoded = { id: string }

io.use(async (socket, next) => {
  const token = socket.handshake.query.token
  if (token) {
    console.log(`token: ${token} (${typeof token})`)
    socket.data.user = await User.findById((<decoded><unknown>verifyToken(token)).id)
    socket.data.chats = socket.data.user ? await Chat.find({ 'users.username': socket.data.user.username }):[]
  }
  else {
    socket.data.user = {}
    socket.data.chats = []
  }
  next()
})
io.on('connection', socket => {
  socket.emit('setup', { user: { username: socket.data.user.username }, chats: socket.data.chats })

  socket.on('auth', async (authMode: 'signup' | 'login', username: string, password: string) => {
    let data
    if (username && password) {
      const currentUser = await User.findOne({ username })
      if (authMode === 'signup') {
        if (currentUser)
          data = 'Username already exists'
        else {
          socket.data.user = await User.create({ username, password: hashPassword(password), socketId: socket.id })
          data = [{ username: socket.data.user.username }, generateToken({ id: socket.data.user._id })]
        }
      }
      else {
        if (currentUser && comparePassword(password, currentUser.password)) {
          socket.data.user = currentUser
          data = [{ username: socket.data.user.username }, generateToken({ id: socket.data.user._id })]
        }
        else
          data = "Wrong username or password"
        }
    }
    else {
      if (username)
        data = 'Empty password are sent'
      else
        data = 'Empty username are sent'
    }
    socket.emit('auth', data)
  })
})

io.listen(+<string>process.env.PORT)
