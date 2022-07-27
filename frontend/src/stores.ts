import { writable } from 'svelte/store'


// App
export interface IApp {
  isLoading: boolean
  isAuthenticated: boolean
  contentMode: 'Home' | 'Chat'
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
  name: string
  users: IUser[]
  messages: IMessage[]
}

export const chat = writable(<IChat>{
  name: '',
  users: [],
  messages: []
})

// Message
export interface IMessage {
  content: string
  sender: IUser
}
