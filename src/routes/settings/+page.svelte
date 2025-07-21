<script lang="ts">
	import { selectedPath } from '$lib/stores/file_path';
	let alwaysOnTop = false;

	$: window.api?.set_always_on_top(alwaysOnTop);

	async function handleSelectDirectory() {
		const folderPath = await window.api?.select_directory?.();
		if (folderPath) {
			console.log('Selected folder path:', folderPath);
			selectedPath.set(folderPath);
		}
	}
</script>

<div class="container">
	<a href="/">Go back Home</a>

	<h1>Settings</h1>

	<label class="toggle-wrapper">
		<span class="toggle-label">Always on Top</span>
		<input type="checkbox" bind:checked={alwaysOnTop} class="toggle-input" />
		<div class="toggle-track">
			<div class="toggle-thumb"></div>
		</div>
	</label>

	<button on:click={handleSelectDirectory} class="select-button"> Select Folder </button>

	<div class="selected-path">
		{#if $selectedPath}
			<strong>Selected:</strong>
			{$selectedPath}
		{:else}
			<strong>No folder selected</strong>
		{/if}
	</div>
</div>

<style>
</style>
