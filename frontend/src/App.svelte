<script lang="ts">
  import io from 'socket.io-client'
  import Auth from './lib/Auth/Auth.svelte'
  import Chat from './lib/Chat/Chat.svelte';
  import { user, app } from './stores'


  const token = localStorage.getItem('token')
  const socket = io('http://localhost:7000', token ? { query: { token } }:{})

  socket.on('setup', data => {
    user.set(data.user)
    if (data.user) {
      $app.isAuthenticated = true
      $app.chats = data.chats
    }
    console.log('\x1b[36muser:\x1b[m', data.user)
    console.log('\x1b[36mchats:\x1b[m', data.chats)
    $app.isLoading = false
  })
</script>

{#if $app.isLoading}
  <span>Loading...</span>
{:else}
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
