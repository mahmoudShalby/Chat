<script lang="ts">
  import type { Socket } from 'socket.io-client';
  import { app } from '../../../stores'

  export let socket: Socket

  let value: string
  $: $app.search = { value, mode: !!value }
  $: if ($app.search.mode)
    socket.emit('search', $app.search.value)
  $: if (!$app.search.mode)
    $app.chats = $app.realChats
</script>

<input type="text" bind:value placeholder="Search friends or groups">

<style>
  input {
    width: 95%;
  }
</style>
