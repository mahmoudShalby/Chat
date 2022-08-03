import { writable, type Writable } from 'svelte/store'


// Alert
interface IAlert {
  content: string
  invisible: boolean
}

export const alert = writable(<IAlert>{ content: '', invisible: false })

// App
export interface IApp {
  isLoading: boolean
  isAuthenticated: boolean
  contentMode: 'Home' | 'Chat'
  realChats: IChat[]
  chats: IChat[]
  search: {
    value: string
    mode: boolean
  }
}

export const app = writable(<IApp>{
  isLoading: true,
  isAuthenticated: false,
  contentMode: 'Home',
  realChats: [],
  chats: [],
  search: {
    value: '',
    mode: false
  }
})

// User
export interface IUser {
  username: string
  socketId: string
}

export const user = writable(<IUser>{
  username: '',
  socketId: ''
})

// Chat
export interface IChat {
  _id: string
  name: string
  users: IUser[]
  messages: IMessage[]
  // For handle with ChatListItemAsUser
  socketId?: any
}

export const chat = writable(<IChat>{
  _id: '',
  name: '',
  users: [],
  messages: []
})

// Message
export interface IMessage {
  content: string
  sender: IUser
}

// Chat form
export interface IChatForm {
  inputValue: string
}

export const chatForm = writable(<IChatForm>{
  inputValue: ''
})
