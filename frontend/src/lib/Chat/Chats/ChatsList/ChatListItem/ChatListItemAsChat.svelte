<script lang="ts">
  import ChatListItem from "./ChatListItem.svelte";
  import type { Socket } from 'socket.io-client'


  export let socket: Socket,
  name: string
</script>

<ChatListItem socket={socket} name={name} />
