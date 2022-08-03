<script lang="ts">
  import { chatForm, chat, user } from '../../../../stores'
  import type { Socket } from 'socket.io-client'


  export let socket: Socket

  function keydownHandler(e: KeyboardEvent) {
    if (e.key === 'Enter' && $chatForm.inputValue) {
      socket.emit('new message', )
    }
  }
</script>

<div>
  <input type="text" placeholder="Write a message" bind:value={$chatForm.inputValue} on:keydown={keydownHandler}>
</div>

<style>
  div {
    display: grid;
    place-items: center;
    padding: 0 15px;
  }

  input {
    width: 100%;
  }
</style>
