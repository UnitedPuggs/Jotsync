import { redirect } from "@sveltejs/kit";
import { pb } from '$lib/pocketbase'

export const load = () => {
    if(pb.authStore.isValid) {
        throw redirect(303, '/')
    }
}