declare module 'module' {
	declare module.exports: any
}
export type ActionConst = string

export type Unit = 'ca' | 'uk2' | 'us' | 'si'

export type Coords = {
	lat: number | null,
	lng: number | null
}

export type Units = {
	apparentTemperature: string,
	apparentTemperatureHigh: string,
	apparentTemperatureLow: string,
	cloudCover: string,
	dewPoint: string,
	humidity: string,
	nearestStormDistance: string,
	nearestStormBearing: string,
	ozone: string,
	precipAccumulation: string,
	precipIntensity: string,
	precipIntensityMax: string,
	precipProbability: string,
	pressure: string,
	temperature: string,
	temperatureHigh: string,
	temperatureLow: string,
	visibility: string,
	windBearing: string,
	windGust: string,
	windSpeed: string
}

export type IconTypes =
	| 'clear-day'
	| 'clear-night'
	| 'rain'
	| 'snow'
	| 'sleet'
	| 'wind'
	| 'fog'
	| 'cloudy'
	| 'partly-cloudy-day'
	| 'partly-cloudy-night'
	| string
	| void

export type PrecipTypes = 'rain' | 'snow' | 'sleet'

export type CurrentWeather = {
	apparentTemperature?: number,
	cloudCover?: number,
	dewPoint?: number,
	humidity?: number,
	icon?: IconTypes,
	nearestStormDistance?: number,
	nearestStormBearing?: number,
	ozone?: number,
	precipIntensity?: number,
	precipProbability?: number,
	precipType?: PrecipTypes,
	pressure?: number,
	summary?: string,
	temperature?: number,
	time: number,
	uvIndex?: number,
	visibility?: number,
	windBearing?: number,
	windGust?: number,
	windSpeed?: number
}

export type MinutelyWeatherData = Array<{
	time: number,
	precipIntensity: number,
	precipProbability: number,
	precipIntensityError?: number,
	precipType?: string
}>

export type MinutelyWeather = {
	icon?: IconTypes,
	summary?: string,
	data: MinutelyWeatherData
}

export type HourlyWeatherData = Array<{
	apparentTemperature?: number,
	cloudCover?: number,
	dewPoint?: number,
	humidity?: number,
	icon?: IconTypes,
	ozone?: number,
	precipIntensity?: number,
	precipProbability?: number,
	precipType?: PrecipTypes,
	pressure?: number,
	summary?: string,
	temperature: number,
	time: number,
	uvIndex?: number,
	visibility?: number,
	windBearing?: number,
	windGust?: number,
	windSpeed?: number
}>

export type HourlyWeather = {
	summary: string,
	icon: IconTypes,
	data: HourlyWeatherData
}

export type DailyWeatherData = Array<{
	apparentTemperatureHigh?: number,
	apparentTemperatureHighTime?: number,
	apparentTemperatureLow?: number,
	apparentTemperatureLowTime?: number,
	cloudCover?: number,
	dewPoint?: number,
	humidity?: number,
	icon?: IconTypes,
	moonPhase: number,
	ozone?: number,
	precipIntensity?: number,
	precipIntensityMax?: number,
	precipIntensityMaxTime?: number,
	precipProbability?: number,
	precipType?: PrecipTypes,
	pressure?: number,
	summary?: string,
	sunriseTime: number,
	sunsetTime: number,
	temperatureHigh?: number,
	temperatureHighTime?: number,
	temperatureLow?: number,
	temperatureLowTime?: number,
	time: number,
	uvIndex?: number,
	uvIndexTime?: number,
	visibility?: number,
	windBearing?: number,
	windGust?: number,
	windGustTime?: number,
	windSpeed?: number
}>

export type DailyWeather = {
	summary: string,
	icon: IconTypes,
	data: DailyWeatherData
}

export type WeatherData =
	| DailyWeatherData
	| HourlyWeatherData
	| MinutelyWeatherData

export type WeatherAlertSeverity = 'advisory' | 'watch' | 'warning'

export type WeatherAlert = {
	description: string,
	time: number,
	expires: number,
	regions: Array<string>,
	severity: WeatherAlertSeverity,
	title: string,
	uri: string
}

export type WeatherAlerts = Array<WeatherAlert>

export type Weather = {
	fetched?: number,
	latitude: number,
	longitude: number,
	timezone: string,
	currently: CurrentWeather,
	minutely: MinutelyWeather,
	hourly: HourlyWeather,
	daily: DailyWeather,
	alerts?: WeatherAlerts,
	flags: {
		units: Unit
	}
}

export type GraphOptions = 'temp' | 'tempRange' | 'precip'

export type MuiBreakpointSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type MuiPaletteColor = {
	light: string,
	main: string,
	dark: string,
	contrastText: string
}

export type MuiThemePaletteType = 'light' | 'dark'

export type MuiTheme = {
	breakpoints: {
		keys: Array<MuiBreakpointSizes>,
		values: {
			xs: number,
			sm: number,
			md: number,
			lg: number,
			xl: number
		},
		up: MuiBreakpointSizes => string,
		down: MuiBreakpointSizes => string
	},
	direction: 'ltr' | 'rtl',
	overrides: Object,
	mixins: {
		gutters: (...args: any) => any,
		toolbar: Object
	},
	palette: {
		common: {
			black: string,
			white: string
		},
		type: MuiThemePaletteType,
		primary: MuiPaletteColor,
		secondary: MuiPaletteColor,
		error: MuiPaletteColor,
		text: {
			primary: string,
			secondary: string,
			disabled: string,
			hint: string
		},
		divider: string,
		background: {
			paper: string,
			default: string
		},
		action: {
			active: string,
			hover: string,
			hoverOpacity: number,
			selected: string,
			disabled: string,
			disabledBackground: string
		}
	},
	props: Object,
	shadows: Array<string>,
	spacing: {
		unit: number
	},
	transitions: {
		easing: {
			easeInOut: string,
			easeOut: string,
			easeIn: string,
			sharp: string
		},
		duration: {
			shortest: number,
			shorter: number,
			short: number,
			standard: number,
			complex: number,
			enteringScreen: number,
			leavingScreen: number
		},
		create: (...args: any) => any,
		getAutoHeightDuration: (...args: any) => any
	},
	typography: Object,
	zIndex: {
		mobileStepper: string,
		appBar: string,
		drawer: string,
		modal: string,
		snackbar: string,
		tooltip: string
	}
}

export type OSMLocation = {
	osm_id: string,
	place_id: string,
	lat: string,
	lon: string,
	display_name: string,
	category?: string,
	type?: string,
	icon?: string,
	cached?: boolean
}

export interface WeatherDataVisualization {
	units: Units;

	+data: Array<{
		time: string | number,
		[key: string]: any
	}>;
}

export type Width = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
