import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public'

const url = 'https://choompos.pockethost.io/'
export const pb = new PocketBase(url)

export const curr_user = writable(pb.authStore.model);

pb.autoCancellation(false);
pb.authStore.onChange((auth) => {
    console.log('authstore changed', auth);
    curr_user.set(pb.authStore.model);
});