import {
	SET_DESKTOP_TABLE_EXPANDED,
	SET_MOBILE_TABLE_EXPANDED,
	SET_PREFERRED_UNITS,
	SET_COLD_TEMP,
	SET_HOT_TEMP
} from '../actions/weather-visualizations'
import { celsiusToFahrenheit } from '../lib/convert-temperature'

type actionType = {
	+type: ActionConst
}

export const defaultState = {
	desktopTableExpanded: false,
	mobileTableExpanded: true,
	preferredUnits: 'us',
	coldTemp: 50,
	hotTemp: 80
}

export default function weatherVisualizations(
	state = defaultState,
	action: actionType
) {
	switch (action.type) {
		case SET_DESKTOP_TABLE_EXPANDED:
			return { ...state, ...action }
		case SET_MOBILE_TABLE_EXPANDED:
			return { ...state, ...action }
		case SET_PREFERRED_UNITS:
			return { ...state, ...action }
		case SET_COLD_TEMP:
			return { ...state, ...action }
		case SET_HOT_TEMP:
			return { ...state, ...action }
		default:
			return state
	}
}
