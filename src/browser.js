'use strict';
const electron = require('electron');
const fs = require('fs');
const ipc = electron.ipcRenderer;
const BrowserWindow = electron.remote.BrowserWindow;
const mediumapi = require('./mediumapi');

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
				const file = filenames[0];
				console.log(file);
				try {
					fs.openSync(file, 'r+');
					var data = fs.readFileSync(file).toString();
					mediumapi.publish("", data, file.endsWith("html") | file.endsWith("html") ? "html" : "markdown", [],
						(error, statusCode, headers, body) => {
							if(error) {
					    	console.log('ERROR:', error);
					    	console.log('STATUS:', statusCode);
					    	console.log('HEADERS:', JSON.stringify(headers));
								console.log('BODY:', body);
							} else {
					    	console.log('BODY:', body);
								var bodyContents = JSON.parse(body);
								const url = bodyContents["data"]["url"];
								console.log(url);
								if(url) {
									window.location = url;
								}
							}
						}
					);
				} catch (err) {
					console.error('Couldn\'t read file' + err);
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
