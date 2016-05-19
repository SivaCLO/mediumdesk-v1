'use strict';
const electron = require('electron');
const menu = require('./menu');

exports.onNavigate = (e, url) => {
  if(url.startsWith("https://medium.com/new-story")) {
		menu.setParam("showEditMenu", true);
		electron.Menu.setApplicationMenu(menu.build());
	} else {
    if(menu.getParam("showEditMenu")) {
      menu.setParam("showEditMenu", false);
		  electron.Menu.setApplicationMenu(menu.build());
    }
  }

}
