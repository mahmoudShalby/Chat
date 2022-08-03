<script lang="ts">
  import ChatListItem from "./ChatListItem.svelte";
  import type { Socket } from 'socket.io-client'
  import { app, chat, user, type IMessage, type IUser } from '../../../../../stores'


  export let socket: Socket,
  _id: string,
  name: string,
  users: IUser[],
  messages: IMessage[]

  function clickHandler() {
    socket.emit('join chat', _id)
    chat.set({ _id, name, users, messages })
  }
</script>

<ChatListItem socket={socket} name={name} on:click={clickHandler} />
