<img src="static/Icon.png" width="200">
# Desktop App for Medium - MediumDesk
Developed by Medium enthusiasts

<br>
[![](media/screenshot.png)](https://github.com/sivragav/mediumdesk/releases/latest)

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
