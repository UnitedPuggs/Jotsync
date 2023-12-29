import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase('http://127.0.0.1:8090');

export const curr_user = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log('authstore changed', auth);
    curr_user.set(pb.authStore.model);
});