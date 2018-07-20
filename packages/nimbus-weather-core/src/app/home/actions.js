import axios from 'axios'
import { apiHost } from '../../config'

export const SET_LOCATION: ActionConst = 'SET_LOCATION'
export const SET_WEATHER: ActionConst = 'SET_WEATHER'
export const WEATHER_FETCH_ERROR: ActionConst = 'WEATHER_FETCH_ERROR'
export const SET_ACTIVE_TAB: ActionConst = 'SET_ACTIVE_TAB'
export const SET_FETCHING_WEATHER: ActionConst = 'SET_FETCHING_WEATHER'
export const SET_HOURLY_GRAPH: ActionConst = 'SET_HOURLY_GRAPH'
export const SET_DAILY_GRAPH: ActionConst = 'SET_DAILY_GRAPH'
export const SET_WEATHER_API_ERROR = 'SET_WEATHER_API_ERROR'
export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION'
export const SET_CURRENT_LOCATION_ERROR = 'SET_CURRENT_LOCATION_ERROR'

export function setLocation(location) {
	return {
		type: SET_LOCATION,
		location
	}
}

export function setWeather(weather: CurrentWeather) {
	return {
		type: SET_WEATHER,
		weather
	}
}

export function setActiveTab(activeTab: number) {
	return {
		type: SET_ACTIVE_TAB,
		activeTab
	}
}

export function setFetchingWeather(fetchingWeather: boolean) {
	return {
		type: SET_FETCHING_WEATHER,
		fetchingWeather
	}
}

export function setHourlyGraph(hourlyGraph: GraphOptions) {
	return {
		type: SET_HOURLY_GRAPH,
		hourlyGraph
	}
}

export function setDailyGraph(dailyGraph: GraphOptions) {
	return {
		type: SET_DAILY_GRAPH,
		dailyGraph
	}
}

export function setWeatherApiError(weatherApiError: boolean) {
	return {
		type: SET_WEATHER_API_ERROR,
		weatherApiError
	}
}

export function fetchWeather() {
	return function dispatchFetchWeather(dispatch, getState) {
		dispatch(setFetchingWeather(true))

		const { home, weatherVisualizations } = getState()

		return axios
			.get(`${apiHost}/forecast`, {
				params: {
					lat: home.location.coords.lat,
					lng: home.location.coords.lng,
					units: weatherVisualizations.preferredUnits
				}
			})
			.then(res => res.data)
			.then(res => {
				dispatch(setFetchingWeather(false))
				return res
			})
			.catch(() => {
				dispatch(setWeatherApiError(true))
				dispatch(setFetchingWeather(false))
			})
	}
}

export function setCurrentLocationError(
	currentLocationError: boolean,
	currentLocationErrorMessage: string | null = null
) {
	return {
		type: SET_CURRENT_LOCATION_ERROR,
		currentLocationError,
		currentLocationErrorMessage
	}
}

export function setCurrentLocation(position: Position) {
	return {
		type: SET_CURRENT_LOCATION,
		currentLocation: {
			name: 'Current Location',
			lat: position.coords.latitude,
			lng: position.coords.longitude
		}
	}
}

export function geolocate() {
	return function dispatchGeolocate(dispatch) {
		if (!navigator || !navigator.geolocation) {
			return dispatch(setCurrentLocationError(true))
		}

		return navigator.geolocation.getCurrentPosition(
			(position: Position) => {
				dispatch(setCurrentLocation(position))
			},
			(positionError: PositionError) =>
				dispatch(setCurrentLocationError(true, positionError.message)),
			{ enableHighAccuracy: true }
		)
	}
}
