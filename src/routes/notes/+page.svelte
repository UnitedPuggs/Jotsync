<script>
    import { pb, curr_user } from '$lib/pocketbase';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let notes = [];

    onMount(async() => {
        notes = await pb.collection('notes').getFullList({
            filter: `user.id="${$curr_user.id}"`,
            sort: '-created',
        })
    });

    

    async function create_note() {
        const data = {
            "user": $curr_user.id,
            "content": "",
        }

        const note = await pb.collection('notes').create(data);
        
        goto(`/notes/${note.id}`);
    }
</script>

<svelte:head>
    <title>notes</title>
</svelte:head>

<div class="flex gap-4 p-4">
    <div class="grid w-full lg:grid-cols-[repeat(auto-fill,minmax(192px,1fr))] gap-2">
    <button class="btn card w-48 h-60 text-2xl font-bold" on:click={create_note}>+</button>
    {#if notes.length > 0}
        {#each notes as note}
            <a href="/notes/{note.id}">
                <div class="card w-48 h-60 p-2 break-all overflow-y-hidden hover:opacity-80 flex flex-col gap-1">
                    <span class="font-bold">{note.title}</span>
                    <hr class="opacity-75">
                    <span class="text-gray-500 text-sm">{note.content}</span>
                </div>
            </a>
        {/each}
    {/if}
    </div>
</div>