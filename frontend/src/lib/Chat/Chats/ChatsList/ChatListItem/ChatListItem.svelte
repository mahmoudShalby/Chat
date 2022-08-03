<script lang="ts">
  import type { Socket } from 'socket.io-client'


  export let socket: Socket,
  name: string
</script>

<div on:click>
  {name}
</div>

<style>
  div {
    width: 95%;
    height: 50px;
    display: grid;
    place-items: center;
    transition: .3s ease-in-out;
    cursor: pointer;
    border-radius: 15px;
    font-size: 25px; /* I should edit this after adding the avatar */
  }

  div:hover {
    background-color: #2f3542;
  }
</style>
