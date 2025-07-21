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
	<a href="/" class="back-link">Go back Home</a>

	<h1 class="title">Settings</h1>

	<label class="toggle-wrapper">
		<input type="checkbox" bind:checked={alwaysOnTop} class="toggle-input" />
		<div class="toggle-track">
			<div class="toggle-thumb"></div>
		</div>
		<span class="toggle-label">Always on Top</span>
	</label>

	<button on:click={handleSelectDirectory} class="select-button"> Select Folder </button>

	{#if selectedPath}
		<div class="selected-path">
			<strong>Selected:</strong>
			{$selectedPath}
		</div>
	{/if}
</div>

<style>
</style>
