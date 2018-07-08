/* eslint global-require: 0 */
const path = require('path')
const { BrowserWindow, app } = require('electron')
const MenuBuilder = require('./menu')
const isDev = require('electron-is-dev')

const isDebug = process.env.DEBUG_PROD === 'true'

if (isDev || isDebug) {
	require('electron-debug')()
}

let mainWindow = null

const installExtensions = async () => {
	const installer = require('electron-devtools-installer')
	const forceDownload = !!process.env.UPGRADE_EXTENSIONS
	const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']
	/* eslint no-console: 0, compat/compat: 0 */
	return Promise.all(
		extensions.map(name =>
			installer.default(installer[name], forceDownload)
		)
	).catch(console.log)
	/* eslint no-console: 0, compat/compat: 0 */
}

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
	// Respect the OSX convention of having the application in memory even
	// after all windows have been closed
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('ready', async () => {
	if (isDev || isDebug) {
		await installExtensions()
	}

	const devPath = `http://localhost:${process.env.PORT || 1124}`
	// const devPath = `file://${__dirname}/../renderer/.parcel/development/index.html`

	const prodPath = `file://${path.resolve(__dirname, '..', 'renderer', '.parcel', 'production', 'index.html')}`

	const url = isDev ? devPath : prodPath

	mainWindow = new BrowserWindow({
		show: false,
		width: 800,
		height: 600,
		minWidth: 350,
		minHeight: 350
	})

	mainWindow.loadURL(url)

	mainWindow.once('ready-to-show', () => {
		if (!mainWindow) {
			throw new Error('"mainWindow" is not defined')
		}
		mainWindow.show()
		mainWindow.focus()
	})

	mainWindow.on('closed', () => {
		mainWindow = null
	})

	const menuBuilder = new MenuBuilder(mainWindow)
	menuBuilder.buildMenu()
})

app.on('window-all-closed', app.quit)
