<script lang="ts">
  import { app } from '../../../../stores'
  import ChatsListItem from './ChatsListItem.svelte';

</script>

{#if $app.chats.length}
<div>
  {#each $app.chats as chat}
    <ChatsListItem {...chat} />
  {/each}
</div>
{:else}
  <span>No chats</span>
{/if}

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  span {
    height: 100vh;
    display: grid;
    place-items: center;
    font-size: 20px;
  }
</style>
