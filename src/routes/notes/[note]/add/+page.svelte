<script>
    import { pb, curr_user } from '$lib/pocketbase';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { browser } from '$app/environment';

    let user_arr = [];
    let user_set;

    //this shit is downright atrocious, need to figure out how to make server-side pb client
    onMount(async() => {
        if(!$curr_user) {
            if(browser) {
                document.cookie = `https://jotsync.vercel.app/notes/${$page.params.note}/add; path=/`;
            }
            //could store a cookie here and then check for it on the login page?
            goto('/login');
        } else {
            const user_record = await pb.collection('notes').getFullList({
                filter: `id="${$page.params.note}"`,
            });
            
            //console.log(user_record[0].user)
            user_set = new Set(user_record[0].user);

            user_set.add($curr_user.id)

            const data = {
                user: [...user_set],
            }

            if([...user_set].length != user_arr.length) {
                const update_user = await pb.collection('notes').update(`${$page.params.note}`, data);
            }
            goto(`/notes/${$page.params.note}`)
        }
        //...set_name will print out the array
    })
</script>