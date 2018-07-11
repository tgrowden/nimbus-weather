require('../dotenv')()
const path = require('path')
const shell = require('shelljs')
const config = require('./config')

async function dev() {
	// eslint-disable-next-line global-require
	const nodemon = require('nodemon')

	shell.cd(config.paths.server)

	const nodemonConfig = {
		script: path.join(config.paths.server, 'index.js')
	}

	nodemon(nodemonConfig)

	nodemon
		.on('quit', () => {
			process.exit()
		})
		.on('restart', files => {
			// eslint-disable-next-line no-console
			console.log('App restarted due to: ', files)
		})
}

async function start() {
	shell.cd(config.paths.server)

	shell.exec('yarn start')
}

module.exports = {
	dev,
	start
}
