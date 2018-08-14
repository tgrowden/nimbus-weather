// @flow
export const isElectron = !!(window && window.process && window.process.type)

export const env = process.env.NIMBUS_WEATHER_ENV || 'development'

export const apiHost = 'https://nimbus-weather-app.herokuapp.com'

export const gaTrackingId = process.env.GA_TRACKING_ID || ''

export default {
	isElectron,
	env,
	apiHost
}
