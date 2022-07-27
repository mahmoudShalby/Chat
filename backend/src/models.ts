import { model, Schema } from 'mongoose'

export interface IUser {
  _id: Schema.Types.ObjectId
  username: string
  password: string
  socketId: string
}

export const User = model<IUser>('User', new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  socketId: String
}))

export interface IMessage {
  content: string
  sender: Schema.Types.ObjectId
}

export const Message = model<IMessage>('Message', new Schema<IMessage>({
  content: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true }))

export interface IChat {
  users: Schema.Types.ObjectId[]
  messages: Schema.Types.ObjectId[]
}

export const Chat = model<IChat>('Chat', new Schema<IChat>({
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
}))
