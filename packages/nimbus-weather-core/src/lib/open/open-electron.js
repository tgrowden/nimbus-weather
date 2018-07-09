// @flow

export default (url: string) => {
	const electron = window.require('electron')
	const { shell } = electron

	shell.openExternal(url)
}
