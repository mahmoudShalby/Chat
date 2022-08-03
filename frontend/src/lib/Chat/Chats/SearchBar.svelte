<script lang="ts">
  import type { Socket } from 'socket.io-client';
  import { app } from '../../../stores'

  export let socket: Socket

  let lastValue: string
  $: $app.search.mode = !!$app.search.value
  $: if ($app.search.mode && $app.search.value !== lastValue) {
    socket.emit('search', $app.search.value)
    lastValue = $app.search.value
  }
  $: if (!$app.search.mode)
    $app.chats = $app.realChats
</script>

<input type="text" bind:value={$app.search.value} placeholder="Search friends or groups">

<style>
  input {
    width: 95%;
  }
</style>
