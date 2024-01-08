<script>
    import { pb, curr_user } from '$lib/pocketbase';
    import { goto, invalidateAll } from '$app/navigation';
    import { onMount } from 'svelte';

    let notes = [];

    onMount(async() => {
        notes = await pb.collection('notes').getFullList({
            filter: `user.id ?= "${$curr_user.id}"`,
            sort: '-created',
        })
    });

    async function create_note() {
        const data = {
            "user": $curr_user.id,
            "content": "",
            "created_by": $curr_user.id,
        }

        const note = await pb.collection('notes').create(data);
        
        goto(`/notes/${note.id}`);
    }

    async function delete_note(id, idx) {
        await pb.collection('notes').delete(id);
        notes.splice(idx, 1);
        notes = notes;
    }
</script>

<svelte:head>
    <title>notes</title>
</svelte:head>

{#if $curr_user}
<div class="flex gap-4 p-4">
    <div class="grid w-full grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(192px,1fr))] gap-2">
    <button class="btn card w-40 h-56 lg:w-48 lg:h-60 text-2xl font-bold" on:click={create_note}>+</button>
    {#if notes.length > 0}
        {#each notes as note, i}
            <div class="flex flex-col card w-40 h-56 lg:w-48 lg:h-60 p-2">
                <a href="/notes/{note.id}" class="h-full hover:opacity-80">
                    <div class="break-all overflow-y-hidden flex flex-col gap-1">
                        <span class="font-bold">{note.title}</span>
                        <hr class="opacity-75">
                        <p class="text-gray-500 text-sm whitespace-pre-wrap">{note.content}</p>
                    </div>
                </a>
                {#if $curr_user.id == note.created_by}
                    <div class="mt-auto mb-0 flex justify-center items-center h-fit">
                        <hr class="opacity-75">
                        <button 
                        on:click={() => delete_note(note.id, i)}
                        >
                            🚫
                        </button>
                    </div>
                {/if}
            </div>
        {/each}
    {/if}
    </div>
</div>
{:else}
<div class="flex justify-center items-center h-full">
    <h1 class="text-3xl font-bold">You need to be logged in to make and view notes!</h1>
</div>
{/if}