'use strict';
const os = require('os');
const path = require('path');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
const appName = app.getName();

function sendAction(action) {
	const win = BrowserWindow.getAllWindows()[0];

	if (process.platform === 'darwin') {
		win.restore();
	}

	win.webContents.send(action);
}

function openURL(url) {
	const win = BrowserWindow.getAllWindows()[0];
	win.loadURL(url);
}

function openSearch() {
	openURL('https://medium.com/search');
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
				icon: path.join(__dirname, 'static/Icon.png'),
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
				type: 'separator'
			},
			{
				label: 'Search Medium',
				accelerator: 'Cmd+0',
				click() {
					openSearch();
				}
			},
			{
				type: 'separator'
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
				label: 'Sign out',
				accelerator: 'Cmd+8',
				click() {
					sendAction('log-out');
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
				type: 'separator'
			},
			{
				label: 'Search Medium',
				accelerator: 'Ctrl+0',
				click() {
					openSearch();
				}
			},
			{
				type: 'separator'
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
				label: 'Sign out',
				accelerator: 'Ctrl+8',
				click() {
					sendAction('log-out');
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

const tpl = process.platform === 'darwin' ? darwinTpl : otherTpl;

module.exports = electron.Menu.buildFromTemplate(tpl);
