<script lang="ts">
  import { app } from '../../../../stores'
  import type { Socket } from 'socket.io-client'
  import ChatListItemAsUser from './ChatListItem/ChatListItemAsUser.svelte';
  import ChatListItemAsChat from './ChatListItem/ChatListItemAsChat.svelte';


  export let socket: Socket
</script>

{#if $app.chats.length}
<div>
  {#each $app.chats as chat}
    {#if chat.socketId}
      <ChatListItemAsUser socket={socket} {...chat} />
    {:else}
      <ChatListItemAsChat socket={socket} {...chat} />
    {/if}
  {/each}
</div>
{:else if $app.search.mode}
  <span>No result</span>
{:else}
  <span>No chats</span>
{/if}

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  span {
    height: 100vh;
    display: grid;
    place-items: center;
    font-size: 28px;
  }
</style>
