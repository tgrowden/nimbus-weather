const path = require('path')
const lerna = require('../lerna.json')

const paths = {
	projectRoot: path.resolve(__dirname, '..'),
	electron: path.resolve(__dirname, '..', 'packages', 'nimbus-weather-electron'),
	core: path.resolve(__dirname, '..', 'packages', 'nimbus-weather-core'),
	server: path.resolve(__dirname, '..', 'packages', 'nimbus-weather-server'),
	webapp: path.resolve(__dirname, '..', 'packages', 'nimbus-weather-webapp')
}

module.exports = {
	version: lerna.version,
	paths
}
