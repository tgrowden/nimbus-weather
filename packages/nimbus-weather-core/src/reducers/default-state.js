export const drawer = {
	open: false
}

export const home = {
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
	weatherApiError: false
}

export const settings = {
	renderIcons: true
}

export const theme = {
	themePaletteType: 'dark',
	primaryColor: 'indigo',
	secondaryColor: 'pink',
	errorColor: 'red'
}

export const weatherVisualizations = {
	desktopTableExpanded: false,
	mobileTableExpanded: true,
	preferredUnits: 'us',
	coldTemp: 50,
	hotTemp: 80,
	coldTempColor: 'blue',
	hotTempColor: 'red'
}
