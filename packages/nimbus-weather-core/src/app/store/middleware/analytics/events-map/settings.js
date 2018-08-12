import { trackEvent } from '@redux-beacon/google-analytics-gtag'
import {
	SET_GEOLOCATION_TIMEOUT,
	SET_ANIMATE_ICONS,
	SET_CUSTOM_WEATHER_API_HOST,
	SET_GEOLOCATION_HIGH_ACCURACY
} from '../../../../settings/consts'

const category = 'settings'

export default {
	[SET_GEOLOCATION_TIMEOUT]: trackEvent((action, prevState, nextState) => ({
		category,
		action: 'setGeolocationTimeout',
		label: nextState.settings.geolocationTimeout
	})),
	[SET_ANIMATE_ICONS]: trackEvent((action, prevState, nextState) => ({
		category,
		action: 'setAnimateIcons',
		label: nextState.settings.animateIcons
	})),
	[SET_CUSTOM_WEATHER_API_HOST]: trackEvent((action, prevState, nextState) => ({
		category,
		action: 'setCustomWeatherApiHost',
		label: nextState.settings.customWeatherApiHost
	})),
	[SET_GEOLOCATION_HIGH_ACCURACY]: trackEvent(
		(action, prevState, nextState) => ({
			category,
			action: 'setGeolocationHighAccuracy',
			label: nextState.settings.geolocationHighAccuracy
		})
	)
}
