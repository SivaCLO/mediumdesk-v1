'use strict';
const electron = require('electron');
const fs = require('fs');
const ipc = electron.ipcRenderer;
const prompt = require('electron-prompt');
const BrowserWindow = electron.remote.BrowserWindow;
const Common = require('./common');

ipc.on('open-new', () => {
	if (!clickAvatarMenuItem(0)) {
		window.location = 'https://medium.com/new-story';
	}
});

ipc.on('open-drafts', () => {
	if (!clickAvatarMenuItem(1)) {
		window.location = 'https://medium.com/me/stories/drafts';
	}
});

ipc.on('open-stories', () => {
	if (!clickAvatarMenuItem(2)) {
		window.location = 'https://medium.com/me/stories/public';
	}
});

ipc.on('open-stats', () => {
	if (!clickAvatarMenuItem(3)) {
		window.location = 'https://medium.com/me/stats';
	}
});

ipc.on('open-bookmarks', () => {
	if (!clickAvatarMenuItem(5)) {
		window.location = 'https://medium.com/browse/bookmarks';
	}
});

ipc.on('open-pubs', () => {
	if (!clickAvatarMenuItem(6)) {
		window.location = 'https://medium.com/me/publications';
	}
});

ipc.on('open-profile', () => {
	if (!clickAvatarMenuItem(8)) {
		window.location = 'https://medium.com/me';
	}
});

ipc.on('open-settings', () => {
	if (!clickAvatarMenuItem(9)) {
		window.location = 'https://medium.com/me/settings';
	}
});

ipc.on('open-login', () => {
	prompt({
    title: 'Enter the Login URL Received in Email',
    label: 'Auth URL:',
    value: '',
    inputAttrs: {
			type: 'url',
			required: true
    },
    type: 'input'
	})
	.then((r) => {
		if (r && r.indexOf('https://medium.com/m/callback') >= 0) {
			window.location = r;
		}
	})
	.catch(console.error);
});

ipc.on('open-home', () => {
	try {
		document.querySelector('.siteNav-logo').click();
	} catch (e) {
		window.location = 'https://medium.com/';
	}
});

ipc.on('open-search', () => {
	window.location = 'https://medium.com/search';
});

ipc.on('open-file', () => {
		const win = BrowserWindow.getAllWindows()[0];
		const {dialog} = require('electron').remote;
		dialog.showOpenDialog(win, {
				properties: ['openFile'],
				filters: [
			    {name: 'Markdown', extensions: ['md', 'markdown']},
			    {name: 'HTML', extensions: ['html', 'htm']}
			  ]
			}, function(filenames) {
				if(filenames && filenames.length == 1) {
					const file = filenames[0];
					ipc.send('import-file', file);
				}
			}
		);
});

document.documentElement.classList.add(process.platform === 'darwin' ? 'osx' : 'notosx');

function openAvatarMenu() {
	document.querySelector('.metabar-block--right .avatar-image').click();
}

function clickAvatarMenuItem(index) {
	try {
		openAvatarMenu();
		const list = document.querySelectorAll('.popover div ul li');
		list[index].querySelector('a').click();
		return true;
	} catch (e) {
		return false;
	}
}
