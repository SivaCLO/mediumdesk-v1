'use strict';
const electron = require('electron');
const osxAppearance = require('electron-osx-appearance');
const ipc = electron.ipcRenderer;
const {BrowserWindow} = electron.remote;

const storage = electron.remote.require('./storage');

const listSelector = 'div[role="navigation"] > ul > li';
const conversationSelector = '._4u-c._1wfr > ._5f0v.uiScrollableArea';
const selectedConversationSelector = '._5l-3._1ht1._1ht2';

ipc.on('open-new', () => {
	clickAvatarMenuItem(0);
});

ipc.on('open-drafts', () => {
	clickAvatarMenuItem(1);
});

ipc.on('open-stories', () => {
	clickAvatarMenuItem(2);
});

ipc.on('open-stats', () => {
	clickAvatarMenuItem(3);
});

ipc.on('open-bookmarks', () => {
	clickAvatarMenuItem(5);
});

ipc.on('open-pubs', () => {
	clickAvatarMenuItem(6);
});

ipc.on('open-profile', () => {
	clickAvatarMenuItem(8);
});

ipc.on('open-settings', () => {
	clickAvatarMenuItem(9);
});

ipc.on('log-out', () => {
	clickAvatarMenuItem(10);
});

function openAvatarMenu() {
	document.querySelector('.avatar-image').click();
}

function clickAvatarMenuItem(index) {
	openAvatarMenu();
	const list = document.querySelectorAll('.popover div ul li');
	list[index].querySelector('a').click();
}
