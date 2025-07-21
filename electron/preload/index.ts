const { contextBridge, ipcRenderer } = require('electron');

const api = {
	preload: () => {
		console.log('Preload function called');
	},
	main: () => {
		ipcRenderer.invoke('main-function');
	},
	setAlwaysOnTop: (flag) => ipcRenderer.send('set-always-on-top', flag)
};

contextBridge.exposeInMainWorld('api', api);
