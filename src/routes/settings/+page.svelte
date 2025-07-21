<script>
	let alwaysOnTop = false;

	// Whenever the checkbox changes, call the electron API
	$: window.api?.setAlwaysOnTop(alwaysOnTop);
</script>

<div class="flex flex-col items-center justify-center min-h-screen">
	<a href="/" class="text-blue-500 underline"> Go back Home</a>
	<br />
	<h1 class="text-2xl font-bold">Settings</h1>

	<label class="inline-flex items-center cursor-pointer select-none gap-3">
		<input type="checkbox" bind:checked={alwaysOnTop} class="peer sr-only" />
		<div
			class="w-12 h-6 rounded-full bg-gray-300 peer-checked:bg-blue-600
						 relative transition-colors duration-300"
		>
			<div
				class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full
							 shadow transform transition-transform duration-300
							 peer-checked:translate-x-6"
			></div>
		</div>
		<span class="font-semibold text-gray-700">Always on Top</span>
	</label>
</div>
