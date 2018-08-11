import * as consts from './consts'

export function setAnimateIcons(animateIcons: boolean) {
	return {
		type: consts.SET_ANIMATE_ICONS,
		animateIcons
	}
}

export function setCustomWeatherApiHost(customWeatherApiHost: string) {
	return {
		type: consts.SET_CUSTOM_WEATHER_API_HOST,
		customWeatherApiHost
	}
}

export function setGeolocationTimeout(geolocationTimeout: number) {
	return {
		type: consts.SET_GEOLOCATION_TIMEOUT,
		geolocationTimeout
	}
}

export function setGeolocationHighAccuracy(geolocationHighAccuracy: boolean) {
	return {
		type: consts.SET_GEOLOCATION_HIGH_ACCURACY,
		geolocationHighAccuracy
	}
}

export function setAllowAnalytics(allowAnalytics: boolean) {
	return {
		type: consts.SET_ALLOW_ANALYTICS,
		allowAnalytics
	}
}
