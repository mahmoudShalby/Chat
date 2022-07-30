<script lang="ts">
  export let submitHandler: (authMode: string, username: string, password: string) => void,
  authMode: string

  let username: string,
  password: string
</script>

<form on:submit|preventDefault={() => submitHandler(authMode, username, password)}>
  <h1>{`${authMode[0].toUpperCase()}${authMode.substring(1)}`}</h1>
  <input type="text" placeholder="username" bind:value={username} autocomplete="current-password">
  <input type="password" placeholder="password" bind:value={password} autocomplete="current-password">
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
  }

  h1 {
    margin-bottom: 4px;
  }

  input, button {
    border-radius: 15px;
  }

  input {
    width: 100%;
    padding: 0 10px;
    height: 30px;
  }

  button {
    outline: none;
    border: none;
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

  @media (max-width: 320px) {
    form {
      min-width: 270px;
    }
  }
</style>
