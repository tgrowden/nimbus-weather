import {
	SET_LOCATION,
	SET_WEATHER,
	SET_ACTIVE_TAB,
	SET_FETCHING_WEATHER,
	SET_PREFERRED_UNITS,
	SET_HOURLY_GRAPH,
	SET_DAILY_GRAPH,
	SET_WEATHER_API_ERROR,
	SET_CURRENT_LOCATION,
	SET_CURRENT_LOCATION_ERROR
} from './actions'

type actionType = {
	+type: ActionConst
}

export const defaultState = {
	location: {
		name: '',
		coords: {
			lat: null,
			lng: null
		}
	},
	weather: {
		fetched: 0,
		timezone: '',
		currently: {
			time: 0,
			icon: ''
		},
		daily: {},
		flags: {},
		hourly: {},
		latitude: 0,
		longitude: 0,
		minutely: {}
	},
	activeTab: 0,
	fetchingWeather: false,
	hourlyGraph: 'temp',
	dailyGraph: 'tempRange',
	weatherApiError: false,
	currentLocationError: false,
	currentLocationErrorMessage: null,
	currentLocation: {
		name: 'Current Location',
		lat: null,
		lng: null
	}
}

export default function home(state = defaultState, action: actionType) {
	switch (action.type) {
		case SET_LOCATION:
			return { ...state, ...action }
		case SET_WEATHER:
			return { ...state, ...action }
		case SET_ACTIVE_TAB:
			return { ...state, ...action }
		case SET_FETCHING_WEATHER:
			return { ...state, ...action }
		case SET_PREFERRED_UNITS:
			return { ...state, ...action }
		case SET_HOURLY_GRAPH: {
			return { ...state, ...action }
		}
		case SET_DAILY_GRAPH: {
			return { ...state, ...action }
		}
		case SET_WEATHER_API_ERROR: {
			return { ...state, ...action }
		}
		case SET_CURRENT_LOCATION: {
			return { ...state, ...action }
		}
		case SET_CURRENT_LOCATION_ERROR: {
			return { ...state, ...action }
		}
		default:
			return state
	}
}
