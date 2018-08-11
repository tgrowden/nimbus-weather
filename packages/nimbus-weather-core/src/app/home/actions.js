import axios from 'axios'
import * as consts from './consts'
import { apiHost } from '../../config'
import Location from '../models/location'
import reverseGeocode from '../lib/reverse-geocode'

export function setLocation(location) {
	return {
		type: consts.SET_LOCATION,
		location
	}
}

export function setWeather(weather: CurrentWeather) {
	return {
		type: consts.SET_WEATHER,
		weather
	}
}

export function setActiveTab(activeTab: number) {
	return {
		type: consts.SET_ACTIVE_TAB,
		activeTab
	}
}

export function setFetchingWeather(fetchingWeather: boolean) {
	return {
		type: consts.SET_FETCHING_WEATHER,
		fetchingWeather
	}
}

export function setHourlyGraph(hourlyGraph: GraphOptions) {
	return {
		type: consts.SET_HOURLY_GRAPH,
		hourlyGraph
	}
}

export function setDailyGraph(dailyGraph: GraphOptions) {
	return {
		type: consts.SET_DAILY_GRAPH,
		dailyGraph
	}
}

export function setWeatherApiError(weatherApiError: boolean) {
	return {
		type: consts.SET_WEATHER_API_ERROR,
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
		type: consts.SET_CURRENT_LOCATION_ERROR,
		currentLocationError,
		currentLocationErrorMessage
	}
}

export function setCurrentLocation(currentLocation) {
	return {
		type: consts.SET_CURRENT_LOCATION,
		currentLocation
	}
}

export function setGeolocating(geolocating: boolean) {
	return {
		type: consts.SET_GEOLOCATING,
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
		type: consts.SET_CURRENT_LOCATION,
		currentLocation: new Location()
	})
	dispatch(setCurrentLocationError(true, positionError.message))
}
