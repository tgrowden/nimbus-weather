const path = require('path')
const config = require('../../scripts/config')

const isDev = process.env.NODE_ENV !== 'production'

const devConfig = {
	outDir: path.join(config.paths.webapp, 'dev'),
	path: '/',
	start_url: '/'
}

const prodConfig = {
	outDir: path.join(config.paths.projectRoot, 'docs'),
	path: '/nimbus-weather/',
	start_url: '/nimbus-weather/'
}

const postHtmlConfig = isDev ? devConfig : prodConfig

module.exports = {
	plugins: {
		'posthtml-favicons': {
			outDir: postHtmlConfig.outDir,
			configuration: {
				root: path.join(config.paths.webapp, 'src'),
				path: postHtmlConfig.path,
				appName: 'Nimbus Weather',
				appDescription: null,
				developerName: 'Taylor Growden <taylor.growden@gmail.com>',
				developerURL: 'https://github.com/tgrowden',
				dir: 'auto',
				lang: 'en-US',
				background: '#fff',
				theme_color: '#3f51b5',
				display: 'standalone',
				orientation: 'any',
				start_url: postHtmlConfig.start_url,
				version: '1.0',
				logging: false,
				icons: {
					android: true,
					appleIcon: {
						background: false
					},
					appleStartup: false,
					coast: true,
					favicons: true,
					firefox: true,
					windows: true,
					yandex: true
				}
			}
		}
	}
}
