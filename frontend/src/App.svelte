<script lang="ts">
  import io from 'socket.io-client'
  import Auth from './lib/Auth/Auth.svelte'
  import Chat from './lib/Chat/Chat.svelte';
  import { user, app, type IUser, type IChat, alert } from './stores'
  import Alert from "./lib/Alert.svelte"


  const token = localStorage.getItem('token')
  const socket = io('http://localhost:7000', token ? { query: { token } }:{})

  socket.on('setup', (data: { user: IUser, chats: IChat[] }) => {
    user.set(data.user)
    if (data.user.username) {
      $app.isAuthenticated = true
      $app.chats = data.chats
    }
    console.log('\x1b[36muser:', data.user)
    console.log('\x1b[36mchats:', data.chats)
    $app.isLoading = false
  })

  socket.on('auth', (data: { user: IUser, chats: IChat[], token: string } | string) => {
    if (typeof data === 'string')
      alert.set({ content: data, invisible: true })
    else {
      user.set(data.user)
      localStorage.setItem('token', data.token)
      $app.isAuthenticated = true
    }
  })

  socket.on('search result', (result: IChat[]) => {
    $app.chats = result
    console.log(result)
  })
</script>

{#if $app.isLoading}
  <span>Loading...</span>
{:else}
  <Alert bind:content={$alert.content} bind:invisible={$alert.invisible} />
  {#if $app.isAuthenticated}
    <Chat socket={socket} />
  {:else}
    <Auth socket={socket} />
  {/if}
{/if}

<style>
  span {
    height: 100vh;
    display: grid;
    place-items: center;
    font-size: 40px;
  }
</style>
