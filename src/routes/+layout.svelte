<script>
	import '../app.postcss';
	import { AppShell, TabAnchor, TabGroup, LightSwitch, initializeStores, getToastStore } from '@skeletonlabs/skeleton'
	import { pb, curr_user } from '$lib/pocketbase';
	import { goto } from '$app/navigation'


	async function logout() {
		pb.authStore.clear();
		goto('/')
	}

	initializeStores();
</script>

<AppShell>
	<svelte:fragment slot="header">
		<TabGroup
		justify="justify-center items-center"
		active="variant-filled-primary"
		hover="hover:variant-soft-tertiary"
		rounded=""
		class="font-bold lg:text-2xl w-full"
		>
			<TabAnchor href="/">
				<div class="flex justify-center items-center">
					<span>Jotsync</span>
					<img src="/assets/logo.png" alt="Jotsync logo" class="w-12 drop-shadow-md dark:drop-shadow-none"/>
				</div>
			</TabAnchor>
			<TabAnchor href="/notes">
				Notes
			</TabAnchor>
			{#if !$curr_user}
				<TabAnchor href="/login">
					Login
				</TabAnchor>
			{:else}
				<TabAnchor on:click={logout}>
					Logout
				</TabAnchor>
			{/if}
			<TabAnchor>
				<LightSwitch />
			</TabAnchor>
		</TabGroup>
	</svelte:fragment>
	<slot />
</AppShell>