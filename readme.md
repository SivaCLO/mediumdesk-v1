<img src="static/Icon.png" width="200">
# MediumDesk [![Build Status](https://travis-ci.org/sivragav/mediumdesk.svg?branch=master)](https://travis-ci.org/sivragav/mediumdesk) [![Downloads](https://img.shields.io/github/downloads/sivragav/mediumdesk/total.svg)](https://github.com/sivragav/mediumdesk/releases/latest)
MediumDesk is a simple app that lets you read and write Medium stories when you are at your desk. *Developed by Medium enthusiasts*

[![](media/screenshot.png)](https://github.com/sivragav/mediumdesk/releases/latest)

## Download
*(Current version : 0.2.1)*

**[OS X (10.9+)](https://github.com/sivragav/mediumdesk/releases/download/v0.2.1/MediumDesk-osx-0.2.1.zip)**

**[Linux](https://github.com/sivragav/mediumdesk/releases/download/v0.2.1/MediumDesk-linux-0.2.1.zip)**

Windows (7+) - Coming Soon

## Features
The goal of this app is to purely extend medium.com's experience into desktops. We don't intend to modify/replace any behavior. For every feature we add, we ask ourselves "Would Medium do it, If they built a desktop app?".

* The first goal is to be able to use medium.com without any issues in it's own window. So it is always accessible through your Applications folder, Dock / Task Bar, Search. To find your draft,  you don't have to dig through browser tabs anymore.
* Native Menus & Shortcuts for commonly used functions (<kbd>Cmd</kbd> <kbd>N</kbd> / <kbd>Ctrl</kbd> <kbd>N</kbd> - New Story, <kbd>Cmd</kbd> <kbd>F</kbd> / <kbd>Ctrl</kbd> <kbd>F</kbd> - Search Medium, <kbd>Cmd</kbd> <kbd>0-7</kbd> / <kbd>Ctrl</kbd> <kbd>0-7</kbd> - Home, Drafts, Public Stories, Stats, Bookmarks, Publications, Profile, Settings.)

## Coming Soon
* Import file from disk...
* Back & Forward within the App
* Open in Browser
* Pin pages to keep them open
* External URLs show a top bar similar to medium

---

## Dev

## Issues

Feel free to submit issues and enhancement requests.

## Contributing

MediumDesk is built with [Electron](http://electron.atom.io) & would love to accept pull requests for any issues or feature request.

[Read more on contributing](https://github.com/sivragav/mediumdesk/blob/master/CONTRIBUTING.md)

###### Commands

- Init: `$ npm install`
- Run: `$ npm start`
- Build OS X: `$ npm run build:osx`
- Build Linux: `$ npm run build:linux`
- Build Windows: `$ npm run build:windows`
- Build all: `$ brew install wine` and `$ npm run build` *(OS X only)*
