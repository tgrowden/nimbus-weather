export const SET_LOCATION: ActionConst = 'SET_LOCATION'
export const SET_WEATHER: ActionConst = 'SET_WEATHER'
export const WEATHER_FETCH_ERROR: ActionConst = 'WEATHER_FETCH_ERROR'
export const SET_ACTIVE_TAB: ActionConst = 'SET_ACTIVE_TAB'
export const SET_FETCHING_WEATHER: ActionConst = 'SET_FETCHING_WEATHER'
export const SET_HOURLY_GRAPH: ActionConst = 'SET_HOURLY_GRAPH'
export const SET_DAILY_GRAPH: ActionConst = 'SET_DAILY_GRAPH'
export const SET_WEATHER_API_ERROR = 'SET_WEATHER_API_ERROR'

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
