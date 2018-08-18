/* eslint import/no-mutable-exports: 0, global-require: 0 */
export const isElectron = getIsElectron()

export function getIsElectron() {
	return !!(window && window.require && window.process && window.process.type)
}

let res

if (isElectron) {
	res = require('./open-electron').default
} else {
	res = require('./open-browser').default
}

export default res
