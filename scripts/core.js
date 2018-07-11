require('../dotenv')()
const Bundler = require('parcel-bundler')
const path = require('path')

const corePath = path.resolve(
	__dirname,
	'..',
	'packages',
	'nimbus-weather-core'
)

async function dev() {
	const opts = {
		cache: false,
		cacheDir: '.core-cache',
		watch: true,
		outDir: path.join(corePath, 'dist')
	}

	const bundler = new Bundler(path.join(corePath, 'src', 'index.js'), opts)

	await bundler.bundle()
}

async function build() {
	process.env.NODE_ENV = 'production'

	const opts = {
		cache: false,
		watch: false,
		outDir: path.join(corePath, 'dist')
	}

	const bundler = new Bundler(path.join(corePath, 'src', 'index.js'), opts)

	await bundler.bundle()
}

module.exports = {
	build,
	dev
}
