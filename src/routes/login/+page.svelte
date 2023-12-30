<script>
    import { pb, curr_user } from '$lib/pocketbase';
    import { goto } from '$app/navigation';

    async function login_with_discord() {
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'discord' });
    }
    async function login_with_google() {
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
    }
</script>

{#if !$curr_user}
<div class="flex flex-col gap-2 justify-center items-center mt-10">
    <button on:click={login_with_discord} class="btn btn-lg variant-filled font-bold">Discord Login</button>
    <button on:click={login_with_google} class="btn btn-lg variant-filled font-bold">Google Login</button>
</div>
{:else}
    {goto('/notes')}
{/if}