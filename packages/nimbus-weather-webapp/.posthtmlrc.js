const path = require('path')
const config = require('../../scripts/config')

const isDev = process.env.NODE_ENV !== 'production'

const devConfig = {
	outDir: path.join(config.paths.webapp, 'dev'),
	path: '/'
}

const prodConfig = {
	outDir: path.join(config.paths.projectRoot, 'docs'),
	path: '/nimbus-weather/'
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
				developerName: null,
				developerURL: null,
				dir: 'auto',
				lang: 'en-US',
				background: 'rgba(0, 0, 0, 0)',
				theme_color: '#3f51b5',
				display: 'standalone',
				orientation: 'any',
				start_url: '/nimbus-weather',
				version: '1.0',
				logging: false,
				icons: {
					android: true,
					appleIcon: true,
					appleStartup: true,
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
