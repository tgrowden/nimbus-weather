import { trackEvent } from '@redux-beacon/google-analytics-gtag'
import {
	SET_CURRENT_LOCATION,
	SET_CURRENT_LOCATION_ERROR,
	SET_LOCATION,
	SET_WEATHER,
	SET_WEATHER_API_ERROR,
	SET_HOURLY_GRAPH,
	SET_DAILY_GRAPH,
	SET_ACTIVE_TAB
} from '../../../../home/consts'

const category = 'home'

const views = ['current', 'hourly', 'daily', 'alerts']

export default {
	[SET_CURRENT_LOCATION]: trackEvent(() => ({
		category,
		action: 'setCurrentLocation'
	})),
	[SET_CURRENT_LOCATION_ERROR]: trackEvent((action, prevState, nextState) => {
		if (!nextState.home.currentLocationError) return {}

		return {
			category,
			action: 'setCurrentLocationError',
			label: nextState.home.currentLocationErrorMessage || 'true'
		}
	}),
	[SET_LOCATION]: trackEvent((action, prevState, nextState) => {
		if (prevState.home.location === nextState.home.location) return {}

		return {
			category,
			action: 'setLocation'
		}
	}),
	[SET_WEATHER]: trackEvent(() => ({
		category,
		action: 'setWeather'
	})),
	[SET_WEATHER_API_ERROR]: trackEvent((action, prevState, nextState) => {
		if (!nextState.home.weatherApiError) return {}

		return {
			category,
			action: 'setWeatherApiError',
			label: 'true'
		}
	}),
	[SET_HOURLY_GRAPH]: trackEvent((action, prevState, nextState) => ({
		category,
		action: 'setHourlyGraph',
		label: nextState.home.hourlyGraph
	})),
	[SET_DAILY_GRAPH]: trackEvent((action, prevState, nextState) => ({
		category,
		action: 'setDailyGraph',
		label: nextState.home.dailyGraph
	})),
	[SET_ACTIVE_TAB]: trackEvent((action, prevState, nextState) => ({
		category,
		action: 'setActiveTab',
		label: views[nextState.home.activeTab] || null,
		value: nextState.home.activeTab
	}))
}
