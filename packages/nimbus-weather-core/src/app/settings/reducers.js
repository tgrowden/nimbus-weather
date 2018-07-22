import {
	SET_RENDER_ICONS,
	SET_CUSTOM_WEATHER_API_HOST,
	SET_GEOLOCATION_TIMEOUT,
	SET_GEOLOCATION_HIGH_ACCURACY
} from './actions'

type actionType = {
	+type: ActionConst
}

export const defaultState = {
	renderIcons: true,
	customWeatherApiHost: '',
	geolocationTimeout: 10,
	geolocationHighAccuracy: true
}

export default function settings(state = defaultState, action: actionType) {
	switch (action.type) {
		case SET_RENDER_ICONS:
			return { ...state, ...action }
		case SET_CUSTOM_WEATHER_API_HOST:
			return { ...state, ...action }
		case SET_GEOLOCATION_TIMEOUT:
			return { ...state, ...action }
		case SET_GEOLOCATION_HIGH_ACCURACY:
			return { ...state, ...action }
		default:
			return state
	}
}
