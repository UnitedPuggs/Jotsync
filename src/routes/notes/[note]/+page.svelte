<script>
    import { pb } from '$lib/pocketbase';
    import { page } from '$app/stores';
    import { clipboard, getToastStore, Toast } from '@skeletonlabs/skeleton';
    import { onDestroy, onMount } from 'svelte';

    let title;
    $: note = "";
    let timer;

    const toast_store = getToastStore();

    onMount(async() => {
        const note_record = await pb.collection('notes').getOne(`${$page.params.note}`);
        note = note_record;
        title = note.title;

        console.log(note)

        pb.collection('notes').subscribe(`${note.id}`, async({ action, record }) => {
            if(action === 'update') {
                if(title != record.title) {
                    title = record.title;
                }
                if(note.content != record.content) {
                    note.content = record.content;
                }
            }
        })
    });

    onDestroy(() => {
        pb.collection('notes').unsubscribe(`${note.id}`);
    })


    async function update_title() {
        const update_data = {
            "title": title,
        }

        const title_record = await pb.collection('notes').update(`${note.id}`, update_data);
    }

    async function update_content() {
        const update_data = {
            "content": note.content,
        }

        const content_record = await pb.collection('notes').update(`${note.id}`, update_data);
    }

    function parse_date(created) {
        const date = new Date(created)

        return date;
    }

    async function trigger_toast() {
        const t = {
            message: "Copied link!",
            timeout: 3000,
            background: 'variant-filled'
        };

        toast_store.trigger(t);
    }

    const debounce_title = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            update_title();
        }, 1000);
    }

    const debounce_content = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            update_content();
        }, 1000);
    }
</script>

<svelte:head>
    <title>{title} by {note.user}</title>
</svelte:head>

<Toast />
<div class="flex flex-col gap-2 h-full p-4">
    <span class="text-center">Shareable Link</span>
    <span class="text-center btn variant-filled w-fit mx-auto font-bold">
        <button 
        use:clipboard={`https://jotsync.vercel.app/${note.id}/add`} 
        on:click={trigger_toast}
        >
        jotsync.vercel.app/{note.id}/add
        </button>
    </span>
    <input type="text" class="bg-inherit w-full text-3xl font-bold" bind:value={title} on:input={debounce_title} placeholder="title here">
    <p class="text-sm">created {parse_date(note.created)}</p>
    <hr class="opacity-75">
    <textarea class="bg-inherit w-full h-full" bind:value={note.content} on:input={debounce_content} placeholder="notes here"></textarea>
</div>