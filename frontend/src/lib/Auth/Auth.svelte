<script lang="ts">
  import type { Socket } from "socket.io-client"
  import { user, type IUser, app, type IChat, alert } from '../../stores'
  import AuthForm from "./AuthForm.svelte"


  export let socket: Socket

  function submitHandler(authMode: string, username: string, password: string) {
    if (username && password) {
      socket.emit('auth', authMode, username, password)
    }
    else {
      if (!username)
        alert.set({ content: 'Please enter a username', invisible: true })
      else if (!password)
        alert.set({ content: 'Please enter a password', invisible: true })
    }
  }
</script>


<div>
  <span>
    <AuthForm submitHandler={submitHandler} authMode='signup' />
  </span>
  <span>
    <AuthForm submitHandler={submitHandler} authMode='login' />
  </span>
</div>

<style>
  div {
    height: 100vh;
    display: grid;
    grid-template-columns: 50% 50%;
  }

  div :last-child {
    background-color: #2f3542;
  }

  span {
    display: grid;
    place-items: center;
  }

  @media (max-width: 615px) {
    div {
      grid-template-columns: 1fr;
    }
  }
</style>