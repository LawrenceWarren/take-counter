<script lang="ts">
	import { selectedPath } from '$lib/stores/file_path';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const fileCount = writable(0);

	$: filter_text = '';

	onMount(() => {
		window.api.watch_directory($selectedPath as string, filter_text);
		window.api.on_directory_count((count) => {
			fileCount.set(count);
		});
	});

	$: {
		console.log(filter_text);
		window.api.watch_directory($selectedPath as string, filter_text);
	}
</script>

<div>
	<h1>Welcome to TakeCounter</h1>
	<a href="/settings">Go to settings</a>

	<label for="filter">Filter:</label>
	<input id="filter" type="text" class="input" bind:value={filter_text} />

	{#if $selectedPath}
		<div>
			<p>Files in {$selectedPath}: <strong>{$fileCount}</strong></p>
		</div>
	{/if}
</div>
