'use strict';
const path = require('path');
const fs = require('fs');
const electron = require('electron');
const app = electron.app;
const menu = require('./menu');
const storage = require('./storage');
const navigate = require('./navigate');
const tray = require('./tray');
const UpdateHandler = require('./update');
const Common = require('./common');

require('electron-debug')();
require('electron-dl')();

let mainWindow;
let isQuitting = false;

const isAlreadyRunning = app.makeSingleInstance(() => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}
		mainWindow.show();
	}
});

if (isAlreadyRunning) {
	app.quit();
}

function createMainWindow() {
	const lastWindowState = storage.get('lastWindowState') || Common.WINDOW_SIZE;

	const win = new electron.BrowserWindow({
		title: app.getName(),
		show: false,
		x: lastWindowState.x,
		y: lastWindowState.y,
		width: lastWindowState.width,
		height: lastWindowState.height,
		icon: process.platform === 'linux' && path.join(__dirname, '../static/Icon.png'),
		minWidth: 992,
		minHeight: 450,
		// titleBarStyle: 'hidden-inset',
		// autoHideMenuBar: true,
		webPreferences: {
			// fails without this because of CommonJS script detection
			nodeIntegration: false,
			preload: path.join(__dirname, 'browser.js'),
			webSecurity: true,
			plugins: true
		}
	});

	win.loadURL(Common.MEDIUM_HOME);

	win.on('close', e => {
		if (!isQuitting) {
			e.preventDefault();

			if (process.platform === 'darwin') {
				app.hide();
			} else {
				win.hide();
			}
		}
	});

	return win;
}

app.on('ready', () => {
	electron.Menu.setApplicationMenu(menu.build());
	mainWindow = createMainWindow();
	tray.create(mainWindow);

	const page = mainWindow.webContents;

	page.on('dom-ready', () => {
		page.insertCSS(fs.readFileSync(path.join(__dirname, 'styles/browser.css'), 'utf8'));
		mainWindow.show();
	});

	page.on('did-navigate', navigate.onNavigate);
	page.on('did-navigate-in-page', navigate.onNavigate);

	page.on('new-window', (e, url) => {
		e.preventDefault();
		electron.shell.openExternal(url);
	});

	new UpdateHandler().checkForUpdate(`v${app.getVersion()}`, true);
});

app.on('activate', () => {
	mainWindow.show();
});

app.on('before-quit', () => {
	isQuitting = true;

	if (!mainWindow.isFullScreen()) {
		storage.set('lastWindowState', mainWindow.getBounds());
	}
});
