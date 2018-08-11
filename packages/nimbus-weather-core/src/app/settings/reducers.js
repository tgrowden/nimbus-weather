import {
	SET_ANIMATE_ICONS,
	SET_CUSTOM_WEATHER_API_HOST,
	SET_GEOLOCATION_TIMEOUT,
	SET_GEOLOCATION_HIGH_ACCURACY,
	SET_ALLOW_ANALYTICS
} from './consts'

type actionType = {
	+type: ActionConst
}

export const defaultState = {
	animateIcons: true,
	customWeatherApiHost: '',
	geolocationTimeout: 10,
	geolocationHighAccuracy: true,
	allowAnalytics: false
}

export default function settings(state = defaultState, action: actionType) {
	switch (action.type) {
		case SET_ANIMATE_ICONS:
			return { ...state, ...action }
		case SET_CUSTOM_WEATHER_API_HOST:
			return { ...state, ...action }
		case SET_GEOLOCATION_TIMEOUT:
			return { ...state, ...action }
		case SET_GEOLOCATION_HIGH_ACCURACY:
			return { ...state, ...action }
		case SET_ALLOW_ANALYTICS:
			return { ...state, ...action }
		default:
			return state
	}
}
