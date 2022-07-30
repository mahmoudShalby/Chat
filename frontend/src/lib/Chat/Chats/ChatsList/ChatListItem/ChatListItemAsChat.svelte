<script lang="ts">
  import ChatListItem from "./ChatListItem.svelte";
  import type { Socket } from 'socket.io-client'
  import { app, chat, user, type IMessage, type IUser } from '../../../../../stores'


  export let socket: Socket,
  name: string,
  users: IUser[],
  messages: IMessage[]

  function clickHandler() {
    socket.emit('join chat', )
    chat.set({ name, users, messages })
  }
</script>

<ChatListItem socket={socket} name={name} on:click={clickHandler} />
