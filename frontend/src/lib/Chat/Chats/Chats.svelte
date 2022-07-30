<script lang="ts">
  import type { Socket } from "socket.io-client";
  import ChatsList from "./ChatsList/ChatsList.svelte";
  import SearchBar from "./SearchBar.svelte";


  export let socket: Socket
</script>

<div>
  <SearchBar socket={socket} />
  <ChatsList socket={socket} />
</div>

<style>
  div {
    height: 100vh;
    display: grid;
    place-items: center;
    grid-template-rows: 40px 1fr;
  }
</style>
