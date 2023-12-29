<script>
    import { pb, curr_user } from '$lib/pocketbase';
    import { goto } from '$app/navigation';

    async function login() {
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'discord' });
    }
</script>

{#if !$curr_user}
    <button on:click={login}>login</button>
{:else}
    {goto('/notes')}
{/if}