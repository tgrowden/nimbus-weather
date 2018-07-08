// @flow
const electron = window.require('electron')
const { shell } = electron

export default (url: string) => {
	shell.openExternal(url)
}
