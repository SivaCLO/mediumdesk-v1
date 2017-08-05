'use strict';
const os = require('os');
const path = require('path');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
const appName = app.getName();
const UpdateHandler = require('./update');

const params = {};

function sendAction(action) {
	const win = BrowserWindow.getAllWindows()[0];

	if (process.platform === 'darwin') {
		win.restore();
	}

	win.webContents.send(action);
}

function checkUpdate() {
	const updateHandler = new UpdateHandler();
	updateHandler.checkForUpdate(`v${app.getVersion()}`, false);
}

const helpSubmenu = [
	{
		label: `${appName} Website...`,
		click() {
			shell.openExternal('https://medium.com/desktop-apps');
		}
	},
	{
		label: `Medium Website...`,
		click() {
			shell.openExternal('https://medium.com');
		}
	},
	{
		type: 'separator'
	},
	{
		label: `Check for updates...`,
		click() {
			checkUpdate();
		}
	},
	{
		label: 'Report an Issue...',
		click() {
			const body = `
<< Please succinctly describe your issue and steps to reproduce it. >>

----
${app.getName()} ${app.getVersion()}
Electron ${process.versions.electron}
${process.platform} ${process.arch} ${os.release()}`;

			shell.openExternal(`https://github.com/sivragav/mediumdesk/issues/new?body=${encodeURIComponent(body)}`);
		}
	}
];

const viewSubmenu = [
	{
		label: `Reload`,
		accelerator: 'CmdOrCtrl+R',
		click() {
			const win = BrowserWindow.getAllWindows()[0];
			win.reload();
		}
	}
];

if (process.platform !== 'darwin') {
	helpSubmenu.push({
		type: 'separator'
	}, {
		label: `About ${appName}`,
		click() {
			electron.dialog.showMessageBox({
				title: `About ${appName}`,
				message: `${appName} ${app.getVersion()}`,
				detail: 'Created by Sivaprakash Ragavan',
				icon: path.join(__dirname, '../static/Icon.png'),
				buttons: []
			});
		}
	});
}

const darwinTpl = [
	{
		label: appName,
		submenu: [
			{
				label: `About ${appName}`,
				role: 'about'
			},
			{
				type: 'separator'
			},
			{
				label: 'Preferences...',
				accelerator: 'Cmd+,',
				click() {
					sendAction('open-settings');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Services',
				role: 'services',
				submenu: []
			},
			{
				type: 'separator'
			},
			{
				label: `Hide ${appName}`,
				accelerator: 'Cmd+H',
				role: 'hide'
			},
			{
				label: 'Hide Others',
				accelerator: 'Cmd+Shift+H',
				role: 'hideothers'
			},
			{
				label: 'Show All',
				role: 'unhide'
			},
			{
				type: 'separator'
			},
			{
				label: `Quit ${appName}`,
				accelerator: 'Cmd+Q',
				click() {
					app.quit();
				}
			}
		]
	},
	{
		label: 'File',
		submenu: [
			{
				label: 'New Story',
				accelerator: 'Cmd+N',
				click() {
					sendAction('open-new');
				}
			},
			{
				label: 'Import from disk...',
				accelerator: 'Cmd+O',
				click() {
					sendAction('open-file');
				}
			},
			{
				label: 'Search Medium',
				accelerator: 'Cmd+Shift+F',
				click() {
					sendAction('open-search');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Home',
				accelerator: 'Cmd+0',
				click() {
					sendAction('open-home');
				}
			},
			{
				label: 'Drafts',
				accelerator: 'Cmd+1',
				click() {
					sendAction('open-drafts');
				}
			},
			{
				label: 'Stories',
				accelerator: 'Cmd+2',
				click() {
					sendAction('open-stories');
				}
			},
			{
				label: 'Stats',
				accelerator: 'Cmd+3',
				click() {
					sendAction('open-stats');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Bookmarks',
				accelerator: 'Cmd+4',
				click() {
					sendAction('open-bookmarks');
				}
			},
			{
				label: 'Publications',
				accelerator: 'Cmd+5',
				click() {
					sendAction('open-pubs');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Profile',
				accelerator: 'Cmd+6',
				click() {
					sendAction('open-profile');
				}
			},
			{
				label: 'Settings',
				accelerator: 'Cmd+7',
				click() {
					sendAction('open-settings');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Open in Browser',
				accelerator: 'Cmd+8',
				click() {
					sendAction('open-in-browser')
				}
			}
		]
	},
	{
		label: 'Edit',
		submenu: [
			{
				label: 'Undo',
				accelerator: 'Cmd+Z',
				role: 'undo'
			},
			{
				label: 'Redo',
				accelerator: 'Shift+Cmd+Z',
				role: 'redo'
			},
			{
				type: 'separator'
			},
			{
				label: 'Cut',
				accelerator: 'Cmd+X',
				role: 'cut'
			},
			{
				label: 'Copy',
				accelerator: 'Cmd+C',
				role: 'copy'
			},
			{
				label: 'Paste',
				accelerator: 'Cmd+V',
				role: 'paste'
			},
			{
				label: 'Select All',
				accelerator: 'Cmd+A',
				role: 'selectall'
			}
		]
	},
	{
		label: 'View',
		submenu: viewSubmenu
	},
	{
		label: 'Window',
		role: 'window',
		submenu: [
			{
				label: 'Minimize',
				accelerator: 'Cmd+M',
				role: 'minimize'
			},
			{
				label: 'Close',
				accelerator: 'Cmd+W',
				role: 'close'
			},
			{
				type: 'separator'
			},
			{
				label: 'Bring All to Front',
				role: 'front'
			},
			{
				label: 'Toggle Full Screen',
				accelerator: 'Ctrl+Cmd+F',
				click() {
					const win = BrowserWindow.getAllWindows()[0];
					win.setFullScreen(!win.isFullScreen());
				}
			}
		]
	},
	{
		label: 'Help',
		role: 'help',
		submenu: helpSubmenu
	}
];

const otherTpl = [
	{
		label: 'File',
		submenu: [
			{
				label: 'New Story',
				accelerator: 'Ctrl+N',
				click() {
					sendAction('open-new');
				}
			},
			{
				label: 'Import from disk...',
				accelerator: 'Ctrl+O',
				click() {
					sendAction('open-file');
				}
			},
			{
				label: 'Search Medium',
				accelerator: 'Ctrl+Shift+F',
				click() {
					sendAction('open-search');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Home',
				accelerator: 'Ctrl+0',
				click() {
					sendAction('open-home');
				}
			},
			{
				label: 'Drafts',
				accelerator: 'Ctrl+1',
				click() {
					sendAction('open-drafts');
				}
			},
			{
				label: 'Stories',
				accelerator: 'Ctrl+2',
				click() {
					sendAction('open-stories');
				}
			},
			{
				label: 'Stats',
				accelerator: 'Ctrl+3',
				click() {
					sendAction('open-stats');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Bookmarks',
				accelerator: 'Ctrl+4',
				click() {
					sendAction('open-bookmarks');
				}
			},
			{
				label: 'Publications',
				accelerator: 'Ctrl+5',
				click() {
					sendAction('open-pubs');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Profile',
				accelerator: 'Ctrl+6',
				click() {
					sendAction('open-profile');
				}
			},
			{
				label: 'Settings',
				accelerator: 'Ctrl+7',
				click() {
					sendAction('open-settings');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Open in Browser',
				accelerator: 'Ctrl+8',
				click() {
					sendAction('open-in-browser')
				}
			},
			{
				label: 'Quit',
				accelerator: 'Ctrl+W',
				click() {
					app.quit();
				}
			}
		]
	},
	{
		label: 'Edit',
		submenu: [
			{
				label: 'Cut',
				accelerator: 'Ctrl+X',
				role: 'cut'
			},
			{
				label: 'Copy',
				accelerator: 'Ctrl+C',
				role: 'copy'
			},
			{
				label: 'Paste',
				accelerator: 'Ctrl+V',
				role: 'paste'
			}
		]
	},
	{
		label: 'View',
		submenu: viewSubmenu
	},
	{
		label: 'Help',
		role: 'help',
		submenu: helpSubmenu
	}
];

exports.build = () => {
	console.log(params);
	const tpl = process.platform === 'darwin' ? darwinTpl : otherTpl;
	return electron.Menu.buildFromTemplate(tpl);
};

exports.setParam = (name, value) => {
	params[name] = value;
};

exports.getParam = name => {
	return params[name];
};
