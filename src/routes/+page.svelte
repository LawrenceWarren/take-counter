<script lang="ts">
	import { selectedPath } from '$lib/stores/file_path';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const file_count = writable(0);

	$: filter_text = '';

	onMount(() => {
		window.api.watch_directory($selectedPath as string, filter_text);
		window.api.on_directory_count((count) => {
			file_count.set(count);
		});
	});

	$: {
		console.log(filter_text);
		window.api.watch_directory($selectedPath as string, filter_text);
	}
</script>

<div class="container">
	<h1>Welcome to TakeCounter</h1>
	<a href="/settings">Go to settings</a>

	<div>
		<label for="filter">Filter file names:</label>
		<input id="filter" type="text" class="input" bind:value={filter_text} />
	</div>

	{#if $selectedPath}
		<p>Files in <strong>{$selectedPath}</strong>:</p>
		<p class="the-counter"><strong>{$file_count}</strong></p>
	{/if}
</div>
