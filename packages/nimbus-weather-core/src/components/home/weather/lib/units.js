import Store from '../../../../store/configureStore'

const { store } = Store

export const si: Units = {
	apparentTemperature: '°C',
	apparentTemperatureHigh: '°C',
	apparentTemperatureLow: '°C',
	cloudCover: '%',
	dewPoint: '°C',
	humidity: '%',
	nearestStormDistance: 'km',
	nearestStormBearing: '°',
	ozone: 'DU',
	precipAccumulation: 'cm',
	precipIntensity: 'mm/hr',
	precipIntensityMax: 'mm/hr',
	precipProbability: '%',
	pressure: 'hPa',
	temperature: '°C',
	temperatureHigh: '°C',
	temperatureLow: '°C',
	visibility: 'km',
	windBearing: '°',
	windGust: 'm/s',
	windSpeed: 'm/s'
}

export const ca: Units = {
	apparentTemperature: '°C',
	apparentTemperatureHigh: '°C',
	apparentTemperatureLow: '°C',
	cloudCover: '%',
	dewPoint: '°C',
	humidity: '%',
	nearestStormDistance: 'km',
	nearestStormBearing: '°',
	ozone: 'DU',
	precipAccumulation: 'cm',
	precipIntensity: 'mm/hr',
	precipIntensityMax: 'mm/hr',
	precipProbability: '%',
	pressure: 'hPa',
	temperature: '°C',
	temperatureHigh: '°C',
	temperatureLow: '°C',
	visibility: 'km',
	windBearing: '°',
	windGust: 'km/hr',
	windSpeed: 'km/hr'
}

export const uk2: Units = {
	apparentTemperature: '°C',
	apparentTemperatureHigh: '°C',
	apparentTemperatureLow: '°C',
	cloudCover: '%',
	dewPoint: '°C',
	humidity: '%',
	nearestStormDistance: 'mi.',
	nearestStormBearing: '°',
	ozone: 'DU',
	precipAccumulation: 'cm',
	precipIntensity: 'mm/hr',
	precipIntensityMax: 'mm/hr',
	precipProbability: '%',
	pressure: 'hPa',
	temperature: '°C',
	temperatureHigh: '°C',
	temperatureLow: '°C',
	visibility: 'mi.',
	windBearing: '°',
	windGust: 'mph',
	windSpeed: 'mph'
}

export const us: Units = {
	apparentTemperature: '°F',
	apparentTemperatureHigh: '°F',
	apparentTemperatureLow: '°F',
	cloudCover: '%',
	dewPoint: '°F',
	humidity: '%',
	nearestStormDistance: 'mi.',
	nearestStormBearing: '°',
	ozone: 'DU',
	precipAccumulation: 'in.',
	precipIntensity: 'in./hr',
	precipIntensityMax: 'in./hr',
	precipProbability: '%',
	pressure: 'mbar',
	temperature: '°F',
	temperatureHigh: '°F',
	temperatureLow: '°F',
	visibility: 'mi.',
	windBearing: '°',
	windGust: 'mph',
	windSpeed: 'mph'
}

export default function getUnits(): Units {
	const state = store.getState()
	const preferredUnits = state.home.preferredUnits || 'us'

	const units = {
		us,
		uk2,
		si,
		ca
	}
	return units[preferredUnits]
}
