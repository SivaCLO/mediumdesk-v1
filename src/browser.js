'use strict';
const electron = require('electron');
const osxAppearance = require('electron-osx-appearance');
const ipc = electron.ipcRenderer;
const storage = electron.remote.require('./storage');

ipc.on('open-new', () => {
	if(!clickAvatarMenuItem(0)) {
		window.location = "https://medium.com/new-story";
	}
});

ipc.on('open-drafts', () => {
	if(!clickAvatarMenuItem(1)) {
		window.location = "https://medium.com/me/stories/drafts";
	}
});

ipc.on('open-stories', () => {
	if(!clickAvatarMenuItem(2)) {
		window.location = "https://medium.com/me/stories/public";
	}
});

ipc.on('open-stats', () => {
	if(!clickAvatarMenuItem(3)) {
		window.location = "https://medium.com/me/stats";
	}
});

ipc.on('open-bookmarks', () => {
	if(!clickAvatarMenuItem(5)) {
		window.location = "https://medium.com/browse/bookmarks";
	}
});

ipc.on('open-pubs', () => {
	if(!clickAvatarMenuItem(6)) {
		window.location = "https://medium.com/me/publications";
	}
});

ipc.on('open-profile', () => {
	if(!clickAvatarMenuItem(8)) {
		window.location = "https://medium.com/me";
	}
});

ipc.on('open-settings', () => {
	if(!clickAvatarMenuItem(9)) {
		window.location = "https://medium.com/me/settings";
	}
});

ipc.on('open-home', () => {
	try {
		document.querySelector('.siteNav-logo').click();
	} catch (e) {
		window.location = "https://medium.com";
	}
});

ipc.on('open-search', () => {
	window.location = "https://medium.com/search";
});

if (process.platform === 'darwin') {
	document.documentElement.classList.add('osx');
} else {
	document.documentElement.classList.add('notosx');
}

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
