<script>
	// import { env } from '$env/dynamic/public';
	// console.log('env', env);
	import { goto } from '$app/navigation';
	import { browser, building, dev, version } from '$app/environment';
	import { navigating } from '$app/stores';
	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import './styles.css';
	import Episodes from './Episodes.svelte';
	export let data;

	$: ({ all_episodes } = data);
</script>

<Header />

{#if !!$navigating}
	<div class="loading">Loading...</div>
{/if}

<main>
	<div class="main">
		<slot />
	</div>

	<aside>
		<Episodes episodes={all_episodes} />
	</aside>
</main>

<Footer />

<style>
	main {
		display: grid;
		grid-template-columns: 30% 1fr;
		gap: 20px;
	}

	aside {
		order: -1;
	}

	.loading {
		position: fixed;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: brown;
		color: white;
		opacity: 0.6;
	}
</style>
