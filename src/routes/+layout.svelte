<script>
	import '../app.postcss';
	import { AppShell, TabAnchor, TabGroup, LightSwitch, initializeStores } from '@skeletonlabs/skeleton'
	import { pb, curr_user } from '$lib/pocketbase';

	async function logout() {
		pb.authStore.clear();
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
		class="font-bold text-2xl w-full"
		>
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