require('../dotenv')()
const path = require('path')
const shell = require('shelljs')
const opn = require('opn')
const rimraf = require('rimraf')
const config = require('./config')

function getTargetArgs(cmd) {
	const targets = []

	if (cmd.all) {
		targets.push('-mwl')
	} else {
		if (cmd.mac) {
			targets.push('-m')
		}
		if (cmd.linux) {
			targets.push('-l')
		}
		if (cmd.windows) {
			targets.push('-w --x64')
		}
	}

	return targets
}

function exec(cmdStr) {
	if (shell.exec(cmdStr).code !== 0) {
		shell.exit(1)
	}
}

async function build() {
	shell.cd(config.paths.electron)

	exec(
		'NODE_ENV=production npx parcel build main/index.js -d main --out-file=main --target=electron'
	)
	exec(
		'NODE_ENV=production npx parcel build renderer/index.html --public-url ./ -d renderer/.parcel/production'
	)
}

async function packageApp(cmd) {
	process.env.NODE_ENV = 'production'

	shell.cd(config.paths.electron)

	const releasePath = path.join(config.paths.electron, 'release')

	rimraf.sync(releasePath)

	let buildCmd = 'NODE_ENV=production npx build --publish never'

	const targets = []

	if (cmd.all) {
		targets.push('-mwl')
	} else {
		if (cmd.mac) {
			targets.push('-m')
		}
		if (cmd.linux) {
			targets.push('-l')
		}
		if (cmd.windows) {
			targets.push('-w')
		}
	}

	if (targets.length) {
		buildCmd += ` ${targets.join(' ')}`
	}

	exec(buildCmd)

	if (cmd.open) {
		opn(releasePath)
	}

	process.exit(0)
}

async function dev() {
	shell.cd(config.paths.electron)
	const port = process.env.PORT || 1124
	exec(
		`npx concurrently --kill-others-on-fail "npx parcel renderer/index.html -p ${port} --no-cache" "npx parcel build main/index.js -d main --out-file=main --target=electron --no-cache && npx electron ."`
	)
}

async function release(cmd) {
	process.env.NODE_ENV = 'production'

	let releaseCmd = 'yarn release'

	shell.cd(config.paths.electron)

	const releasePath = path.join(config.paths.electron, 'release')

	rimraf.sync(releasePath)

	const targetArgs = getTargetArgs(cmd)

	if (targetArgs.length) {
		releaseCmd += ` ${targetArgs.join(' ')}`
	}

	exec(releaseCmd)
}

module.exports = {
	dev,
	build,
	package: packageApp,
	release
}
