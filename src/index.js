'use strict';
const path = require('path');
const fs = require('fs');
const electron = require('electron');
const app = electron.app;
const menu = require('./menu');
const Store = require('electron-store');
const storage = new Store();
const navigate = require('./navigate');
const tray = require('./tray');
const UpdateHandler = require('./update');
const Common = require('./common');
const {ipcMain} = require('electron');
const mediumapi = require('./mediumapi');

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

	let startPage = null;
	switch(storage.get('start-page')) {
		case 'home':
			startPage = Common.MEDIUM_HOME;
			break;
		case 'new':
			startPage = 'https://medium.com/new-story';
			break;
		case 'drafts':
			startPage = 'https://medium.com/me/stories/drafts';
			break;
		default:
			startPage = Common.MEDIUM_HOME;
			break;
	}

	win.loadURL(startPage);
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

// Messages
ipcMain.on('import-file', (event, file) => {
	console.log("Importing : " + file);
	const win = electron.BrowserWindow.getAllWindows()[0];
	showLoadingMessage('Importing from disk...');
	setTimeout(() => {
		try {
			fs.openSync(file, 'r+');
			var data = fs.readFileSync(file).toString();
			mediumapi.publish("", data, file.endsWith("html") | file.endsWith("html") ? "html" : "markdown", [],
				(error, statusCode, headers, body) => {
					if(error || !(statusCode == 200 || statusCode == 201)) {
						console.log('Error: ', error);
						console.log('Status: ', statusCode);
						console.log('Headers: ', JSON.stringify(headers));
						console.log('Body: ', body);
						if(body) {
							var bodyContents = JSON.parse(body);
							showErrorMessage(bodyContents["errors"][0]["message"]);
						} else {
							showErrorMessage('Unknown Error Occured');
						}
					} else {
						console.log('Reponse from Medium: ', body);
						var bodyContents = JSON.parse(body);
						const url = bodyContents["data"]["url"];
						if(url) {
							win.loadURL(url);
						} else {
							showErrorMessage('Error loading Draft');
						}
					}
				}
			);
		} catch (err) {
			console.error('Couldn\'t read file' + err);
			showErrorMessage('Error reading file');
		}
	}, 100);
});

function showLoadingMessage(msg) {
	const win = electron.BrowserWindow.getAllWindows()[0];
	win.loadURL('file://' + __dirname + '/pages/message.html?msg=' + encodeURIComponent(msg) + '&loading=true');
}

function showErrorMessage(msg) {
	const win = electron.BrowserWindow.getAllWindows()[0];
	win.loadURL('file://' + __dirname + '/pages/message.html?msg=' + encodeURIComponent(msg) + '&error=true');
	setTimeout(() => {
		win.loadURL(Common.MEDIUM_HOME);
	}, 2500);
}
