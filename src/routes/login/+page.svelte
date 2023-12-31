<script>
    import { pb, curr_user } from '$lib/pocketbase';
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';

    async function login_with_discord() {
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'discord' });
        if(browser) {
            let x = document.cookie;
            if(x)
                goto(x);
            else
                goto('/')
        }
    }
    async function login_with_google() {
        const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
        if(browser) {
            let x = document.cookie;
            if(x)
                goto(x);
            else
                goto('/')
        }
    }
</script>

<svelte:head>
    <title>Jotsync Login</title>
</svelte:head>

<div class="flex flex-col gap-2 justify-center items-center mt-10">
    <button on:click={login_with_discord} class="btn btn-lg variant-filled font-bold">Discord Login</button>
    <button on:click={login_with_google} class="btn btn-lg variant-filled font-bold">Google Login</button>
</div>