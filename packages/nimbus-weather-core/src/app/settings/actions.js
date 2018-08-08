export const SET_ANIMATE_ICONS: ActionConst = 'ANIMATE_ICONS'
export const SET_CUSTOM_WEATHER_API_HOST: ActionConst =
	'SET_CUSTOM_WEATHER_API_HOST'
export const SET_GEOLOCATION_TIMEOUT: ActionConst = 'SET_GEOLOCATION_TIMEOUT'
export const SET_GEOLOCATION_HIGH_ACCURACY: ActionConst =
	'SET_GEOLOCATION_HIGH_ACCURACY'

export function setAnimateIcons(animateIcons: boolean) {
	return {
		type: SET_ANIMATE_ICONS,
		animateIcons
	}
}

export function setCustomWeatherApiHost(customWeatherApiHost: string) {
	return {
		type: SET_CUSTOM_WEATHER_API_HOST,
		customWeatherApiHost
	}
}

export function setGeolocationTimeout(geolocationTimeout: number) {
	return {
		type: SET_GEOLOCATION_TIMEOUT,
		geolocationTimeout
	}
}

export function setGeolocationHighAccuracy(geolocationHighAccuracy: boolean) {
	return {
		type: SET_GEOLOCATION_HIGH_ACCURACY,
		geolocationHighAccuracy
	}
}
