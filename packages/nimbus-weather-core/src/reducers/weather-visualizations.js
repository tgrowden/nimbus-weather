import {
	SET_DESKTOP_TABLE_EXPANDED,
	SET_MOBILE_TABLE_EXPANDED,
	SET_PREFERRED_UNITS,
	SET_COLD_TEMP,
	SET_HOT_TEMP
} from '../actions/weather-visualizations'

type actionType = {
	+type: ActionConst
}

export const defaultState = {
	desktopTableExpanded: false,
	mobileTableExpanded: true
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
