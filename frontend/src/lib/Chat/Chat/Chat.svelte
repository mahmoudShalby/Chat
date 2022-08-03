<script lang="ts">
  import { chat, user } from '../../../stores'
  import Form from './Form/Form.svelte'
  import MessagesList from './MessagesList/MessagesList.svelte'
  import Navbar from './Navbar/Navbar.svelte'
  import type { Socket } from 'socket.io-client'


  export let socket: Socket

  $: console.log('\x1b[36mchat:', $chat)
  $: if (!$chat.name && $chat.users.length) {
    if ($chat.users.length === 2)
      $chat.name = $chat.users[1].username === $user.username ? $chat.users[2].username:$chat.users[1].username
    else
      console.error(`chat users's length isn't 2 and don't have a name, chat:`, $chat)
  }
</script>

{#if $chat.name}
  <div>
    <Navbar name={$chat.name} />
    <MessagesList />
    <Form socket={socket} />
  </div>
{:else}
  <span>Choose a chat to show</span>
{/if}

<style>
  div {
    height: 100vh;
    display: grid;
    font-size: 25px;
    grid-template-rows: 45px 1fr 40px;
  }

  span {
    display: grid;
    place-items: center;
    height: 100vh;
    font-size: 38px;
  }
</style>
