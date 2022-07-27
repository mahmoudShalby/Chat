<script lang="ts">
  export let submitHandler: (authMode: string, username: string, password: string) => void,
  authMode: string

  let username: string,
  password: string
</script>

<form on:submit|preventDefault={() => submitHandler(authMode, username, password)} style={`--direction: ${authMode === 'signup' ? -1:1}`}>
  <h1>{`${authMode[0].toUpperCase()}${authMode.substring(1)}`}</h1>
  <input type="text" placeholder="username" bind:value={username}>
  <input type="password" placeholder="password" bind:value={password}>
  <button type="submit">Go!</button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    place-items: center;
    gap: 7px;
    min-width: 300px;
    padding: 7px 10px 10px;
    border-radius: 10px;
    animation: in .3s;
  }

  @keyframes in {
    0% {
      transform: translateX(200px * var(--direction));
    }
    100% {
      transform: translateX(0);
    }
  }

  h1 {
    margin-bottom: 4px;
  }

  input, button {
    border-radius: 20px;
    outline: none;
    border: none;
  }

  input {
    width: 100%;
    padding: 0 10px;
    height: 30px;
    transition: .3;
  }

  button {
    margin-top: 3px;
    padding: 5px 10px;
    font-size: 16px;
    font-weight: bold;
    background-color: #1abc9c;
    cursor: pointer;
    transition: .3s;
  }

  button:hover {
    background-color: #16a085;
  }
</style>
