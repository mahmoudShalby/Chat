// Setup .env file
import dotenv from 'dotenv'
dotenv.config()

// Import modules
import { Server } from 'socket.io'
import { connect as connect_db, connection as db_connection } from 'mongoose'
import jwt, { JsonWebTokenError } from 'jsonwebtoken'
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
const getChatsByUsername = async (username: string) => await Chat.find({ 'users.username': username })

io.use(async (socket, next) => {
  const token = <string>socket.handshake.query.token
  if (token) {
    try {
      socket.data.user = await User.findById((<decoded><unknown>verifyToken(token)).id)
      socket.data.user.socketId = socket.id
      socket.data.user.save()
      socket.data.chats = socket.data.user ? await getChatsByUsername(socket.data.user.username):[]
      return next()
    }
    catch (e) {
      if (!(e instanceof JsonWebTokenError))
        throw e
    }
  }
  socket.data.user = {}
  socket.data.chats = []
  next()
})
io.on('connection', socket => {
  socket.emit('setup', { user: { username: socket.data.user.username, socketId: socket.id }, chats: socket.data.chats })

  // socket.on('disconnecting', (reason: string) => {
  //   // socket.data.user.socketId = ''
  //   console.log(socket.data.user)
  //   // socket.data.user.save()
  // })

  const getAuthResult = async () => ({ user: { username: socket.data.user.username, socketId: socket.id }, chats: await getChatsByUsername(socket.data.user.username), token: generateToken({ id: socket.data.user._id })})
  socket.on('auth', async (authMode: 'signup' | 'login', username: string, password: string) => {
    let data
    if (username && password) {
      const currentUser = await User.findOne({ username })
      if (authMode === 'signup') {
        if (currentUser)
          data = 'Username already exists'
        else {
          socket.data.user = await User.create({ username, password: hashPassword(password), socketId: socket.id })
          data = await getAuthResult()
        }
      }
      else {
        if (currentUser && comparePassword(password, currentUser.password)) {
          socket.data.user = currentUser
          data = await getAuthResult()
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

  socket.on('search', async (searchValue: string) => {
    // const chats = await Chat.find({ name: searchValue, users: { $length: { $gt: 2 } } })
    // console.log(chats)
    const users: IUser[] = (
      await User.find({ username: RegExp(searchValue) })
      .select('username socketId -_id')
    )
    .filter(user => user.username != socket.data.user.username)
    let result: IChat[] = []
    users.forEach((user: IUser) => result.push(<IChat><unknown>{ name: user.username, socketId: user.socketId }))
    socket.emit('search result', result)
  })

  socket.on('create chat', async (data: { name: string, users: IUser[] }) => {
    const firstUser = await User.findOne({ username: data.users[0].username })
    const secondUser = await User.findOne({ username: data.users[1].username })
    if (firstUser && secondUser) {
      const result = new Chat({
        name: data.name,
        users: [firstUser._id, secondUser._id]
      })
      let new_users: { username: string, socketId: string }[] = []
      result.users.forEach(async userId => {
        const user = await User.findById(userId).select('username socketId')
        if (user) {
          new_users.push(user)
          if (result.users[result.users.length-1] === userId)
            socket.emit('chat created', { _id: result._id, name: result.name, users: new_users, messages: [] })
        }
        else
          socket.emit('chat created', null)
      })
    }
    else
      socket.emit('chat created', null)
  })
})

io.listen(+<string>process.env.PORT)
console.log('Server started.')
