require('../dotenv')()
const Bundler = require('parcel-bundler')
const path = require('path')
const shell = require('shelljs')
const rimraf = require('rimraf')
const config = require('./config')

async function dev() {
	shell.exec(`npx parcel ${path.join(config.paths.webapp, 'src', 'index.html')} -p ${process.env.WEBAPP_DEV_PORT || 3000} --no-cache`)
}

async function build() {
	process.env.NODE_ENV = 'production'

	const distPath = path.join(config.paths.projectRoot, 'docs')

	rimraf.sync(distPath)

	const opts = {
		cache: false,
		watch: false,
		outDir: distPath
	}

	const bundler = new Bundler(path.join(config.paths.webapp, 'src', 'index.html'), opts)

	await bundler.bundle()
}

module.exports = {
	build,
	dev
}
