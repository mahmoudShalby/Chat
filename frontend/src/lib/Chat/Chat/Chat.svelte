<script>
  import { chat, user } from '../../../stores'


  $: console.log('\x1b[36mchat:', $chat)
  $: if (!$chat.name && $chat.users.length) {
    if ($chat.users.length === 2)
      $chat.name = $chat.users[1] === $user ? $chat.users[2].username:$chat.users[1].username
    else
      console.error(`chats's length isn't 2 and don't have a name, chat:`, $chat)
  }
</script>

{#if $chat.name}
  <div>{$chat.name}</div>
{:else}
  <span>Choose a chat to show</span>
{/if}

<style>
  div {
    height: 100vh;
    display: grid;
    place-items: center;
    font-size: 25px;
  }

  span {
    height: 100vh;
    display: grid;
    place-items: center;
    font-size: 38px;
  }
</style>
