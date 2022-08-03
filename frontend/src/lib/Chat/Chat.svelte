<script lang="ts">
  import type { Socket } from "socket.io-client";
  import Chats from "./Chats/Chats.svelte";
  import Chat from "./Chat/Chat.svelte";


  export let socket: Socket  
</script>

<div>
  <Chats socket={socket} />
  <Chat socket={socket} />
</div>

<style>
  div {
    height: 100vh;
    display: grid;
    grid-template-columns: 270px 1fr;
    gap: 4px;
  }
</style>
