import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import serve from 'electron-serve';
import icon from '../../resources/icon.png?asset';
import fs from 'fs';

let watcher;

const load_url = serve({
	directory: 'out/svelte',
	scheme: 'app'
});

function filter_list(list: string[], filter_text: string) {
	return list.filter((item) => item.toLowerCase().includes(filter_text.toLowerCase()));
}

async function create_window(): Promise<void> {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 900,
		height: 670,
		show: false,
		autoHideMenuBar: true,
		...(process.platform === 'linux' ? { icon } : {}),
		webPreferences: {
			preload: join(__dirname, '../preload/index.cjs'),
			sandbox: true,
			contextIsolation: true
		}
	});

	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
		await mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
	} else {
		await load_url(mainWindow);
	}

	// Show window when ready
	mainWindow.show();

	// Handle external links
	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url);
		return { action: 'deny' };
	});

	ipcMain.on('set-always-on-top', (event, flag) => {
		if (mainWindow) {
			mainWindow.setAlwaysOnTop(flag);
		}
	});

	ipcMain.handle('select-directory', async () => {
		const result = await dialog.showOpenDialog({
			properties: ['openDirectory']
		});
		return result.canceled ? null : result.filePaths[0];
	});

	ipcMain.handle('watch-directory', (event, dirPath, filter_text) => {
		if (watcher) watcher.close();

		watcher = fs.watch(dirPath, { persistent: true }, () => {
			fs.readdir(dirPath, (err, files) => {
				if (err) {
					event.sender.send('directory-count', 0);
				} else {
					const filtered = filter_list(files, filter_text);
					console.log('Filtered is...');
					console.log(filtered);
					event.sender.send('directory-count', filtered.length);
				}
			});
		});

		// Initial count
		fs.readdir(dirPath, (err, files) => {
			const filtered = filter_list(files, filter_text);
			console.log('Filtered is...');
			console.log(filtered);
			event.sender.send('directory-count', err ? 0 : filtered.length);
		});
	});
}

async function main() {
	try {
		await app.whenReady();

		// Set app user model id for windows
		electronApp.setAppUserModelId('com.electron');

		// Default open or close DevTools by F12 in development
		// and ignore CommandOrControl + R in production.
		app.on('browser-window-created', (_, window) => {
			optimizer.watchWindowShortcuts(window);
		});

		await create_window();

		app.on('activate', async () => {
			// On macOS it's common to re-create a window in the app when the
			// dock icon is clicked and there are no other windows open.
			if (BrowserWindow.getAllWindows().length === 0) {
				await create_window();
			}
		});

		// Quit when all windows are closed, except on macOS
		app.on('window-all-closed', () => {
			if (process.platform !== 'darwin') {
				app.quit();
			}
		});

		ipcMain.handle('main-function', () => {
			console.log('Function called from main context with main privileges');
		});
	} catch (error) {
		console.error('Failed to initialize app:', error);
		app.quit();
	}
}

main().catch(console.error);
