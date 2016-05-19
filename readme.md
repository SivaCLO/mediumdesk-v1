<img src="static/Icon.png" width="200">
# Desktop App for Medium - MediumDesk
Developed by Medium enthusiasts

<br>
[![](media/screenshot.png)](https://github.com/sivragav/mediumdesk/releases/latest)

## Features
The goal of this app is to purely extend medium.com's experience into desktops. We don't intend to modify/replace any behavior. For every feature we add, we ask ourselves "Would Medium do it?" So here are the features :

* Native Menus & Shortcuts for commonly used functions (In Progress)
* Back & Forward within the App (Planned)
* Open in Browser (Planned)
* Pin pages to keep them open (Planned)
* External URLs show a top bar similar to medium (Planned)
* Auto upgrade (Planned)

[This Trello Board](https://trello.com/b/xRgXfJ2y/mediumdesk) shows the complete list of features we are working on

## Install

*OS X 10.9+, Windows 7+ & Linux are supported.*

### OS X

[**Download**](https://github.com/sivragav/mediumdesk/releases/latest), unzip, and move `MediumDesk.app` to the `/Applications` directory.

### Windows

[**Download**](https://github.com/sivragav/mediumdesk/releases/latest) and unzip to some location.

### Linux

[**Download**](https://github.com/sivragav/mediumdesk/releases/latest) and unzip to some location.

To add a shortcut to the app, create a file in `~/.local/share/applications` called `mediumdesk.desktop` with the following contents:

```
[Desktop Entry]
Name=MediumDesk
Exec=/full/path/to/folder/MediumDesk
Terminal=false
Type=Application
Icon=/full/path/to/folder/MediumDesk/resources/app/static/Icon.png
```

---

## Dev

Built with [Electron](http://electron.atom.io).

###### Commands

- Init: `$ npm install`
- Run: `$ npm start`
- Build OS X: `$ npm run build:osx`
- Build Linux: `$ npm run build:linux`
- Build Windows: `$ npm run build:windows`
- Build all: `$ brew install wine` and `$ npm run build` *(OS X only)*

## License

MIT © [Sivaprakash Ragavan](https://medium.com/desktop-apps)
