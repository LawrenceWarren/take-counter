const { contextBridge, ipcRenderer } = require('electron');

const api = {
	preload: () => {
		console.log('Preload function called');
	},
	main: () => {
		ipcRenderer.invoke('main-function');
	},
	set_always_on_top: (flag) => ipcRenderer.send('set-always-on-top', flag),
	select_directory: () => ipcRenderer.invoke('select-directory'),
	watch_directory: (dirPath, filter_text) => {
		console.log(`dirPath: ${dirPath}, filter_text: ${filter_text}`);
		if (!dirPath) {
			return;
		}
		ipcRenderer.invoke('watch-directory', dirPath, filter_text);
	},
	on_directory_count: (callback) =>
		ipcRenderer.on('directory-count', (_event, count) => callback(count))
};

contextBridge.exposeInMainWorld('api', api);
