import axios from 'axios'
import { apiHost } from '../../config'
import Location from '../models/location'
import reverseGeocode from '../lib/reverse-geocode'

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
export const SET_GEOLOCATING = 'SET_GEOLOCATING'

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

		const { home, weatherVisualizations, settings } = getState()

		const host = settings.customWeatherApiHost || apiHost

		return axios
			.get(`${host}/forecast`, {
				params: {
					lat: home.location.lat,
					lng: home.location.lng,
					units: weatherVisualizations.preferredUnits
				}
			})
			.then(res => ({
				...res.data,
				fetched: Date.now()
			}))
			.then(res => {
				dispatch(setWeather(res))
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

export function setCurrentLocation(currentLocation) {
	return {
		type: SET_CURRENT_LOCATION,
		currentLocation
	}
}

export function setGeolocating(geolocating: boolean) {
	return {
		type: SET_GEOLOCATING,
		geolocating
	}
}

export function geolocate() {
	return function dispatchGeolocate(dispatch, getState) {
		if (!navigator || !navigator.geolocation) {
			dispatch(setCurrentLocationError(true))
			return
		}

		const { geolocationTimeout, geolocationHighAccuracy } = getState().settings

		dispatch(setGeolocating(true))

		return navigator.geolocation.getCurrentPosition(
			onGeolocationSuccess.bind(null, dispatch),
			onGeolocationError.bind(null, dispatch, getState),
			{
				enableHighAccuracy: geolocationHighAccuracy,
				timeout: geolocationTimeout * 1000
			}
		)
	}
}

async function onGeolocationSuccess(dispatch, position: Position) {
	const geocoded = await reverseGeocode({
		lat: position.coords.latitude,
		lng: position.coords.longitude
	})

	const location = new Location({
		primaryLabel: 'Current Location',
		secondaryLabel: geocoded.display_name,
		lat: position.coords.latitude,
		lng: position.coords.longitude,
		id: geocoded.osm_id
	})

	dispatch(setCurrentLocation(location))
	dispatch(setLocation(location))
	dispatch(setGeolocating(false))
	dispatch(fetchWeather())
}

function onGeolocationError(dispatch, getState, positionError: PositionError) {
	dispatch(setGeolocating(false))
	dispatch({
		type: SET_CURRENT_LOCATION,
		currentLocation: new Location()
	})
	dispatch(setCurrentLocationError(true, positionError.message))
}
