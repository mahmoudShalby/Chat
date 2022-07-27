<script lang="ts">
  import type { Socket } from "socket.io-client"
  import Alert from "../Alert.svelte"
  import { user } from '../../stores'
  import AuthForm from "./AuthForm.svelte"


  export let socket: Socket

  type alertT = {
    content: string
    invisible: boolean
  }

  let alert: alertT = { content: '', invisible: false }

  function submitHandler(authMode: string, username: string, password: string) {
    if (username && password)
      socket.emit('auth', authMode, username, password)
    else {
      if (!username)
        alert = { content: 'Please enter a username', invisible: true }
      else if (!password)
        alert = { content: 'Please enter a password', invisible: true }
    }
  }

  socket.on('auth', data => {
    console.log(data)
    if (typeof data === 'string')
      alert = { content: data, invisible: true }
    else {
      user.set(data[0])
      localStorage.setItem('token', data[1])
      
    }
  })
</script>


<Alert bind:content={alert.content} bind:invisible={alert.invisible} />

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

</style>