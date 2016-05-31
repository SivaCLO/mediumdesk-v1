'use strict';
const electron = require('electron');
const ipc = electron.ipcRenderer;

ipc.on('open-new', () => {
	if (!clickAvatarMenuItem(0)) {
		window.location.pathname = '/new-story';
	}
});

ipc.on('open-drafts', () => {
	if (!clickAvatarMenuItem(1)) {
		window.location.pathname = '/me/stories/drafts';
	}
});

ipc.on('open-stories', () => {
	if (!clickAvatarMenuItem(2)) {
		window.location.pathname = '/me/stories/public';
	}
});

ipc.on('open-stats', () => {
	if (!clickAvatarMenuItem(3)) {
		window.location.pathname = '/me/stats';
	}
});

ipc.on('open-bookmarks', () => {
	if (!clickAvatarMenuItem(5)) {
		window.location.pathname = '/browse/bookmarks';
	}
});

ipc.on('open-pubs', () => {
	if (!clickAvatarMenuItem(6)) {
		window.location.pathname = '/me/publications';
	}
});

ipc.on('open-profile', () => {
	if (!clickAvatarMenuItem(8)) {
		window.location.pathname = '/me';
	}
});

ipc.on('open-settings', () => {
	if (!clickAvatarMenuItem(9)) {
		window.location.pathname = '/me/settings';
	}
});

ipc.on('open-home', () => {
	try {
		document.querySelector('.siteNav-logo').click();
	} catch (e) {
		window.location.pathname = '/';
	}
});

ipc.on('open-search', () => {
	window.location.pathname = '/search';
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
