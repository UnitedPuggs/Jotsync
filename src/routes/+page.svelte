<script>
	import { curr_user } from '$lib/pocketbase';
</script>

<svelte:head>
	<title>Jotsync</title>
</svelte:head>

<div class="flex flex-col gap-2 justify-center items-center h-full">
	<h1 class="font-bold text-3xl">Welcome to Jotsync!</h1>
	<h2 class="font-bold text-lg">A notes-sharing project :)</h2>
	{#if $curr_user}
		<a href="/notes" class="btn variant-outline-surface">Go to your notes</a>
	{:else}
		<a href="/login" class="btn variant-outline-surface">Log in to see your notes</a>
	{/if}
</div>