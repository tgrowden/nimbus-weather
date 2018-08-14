import { fetchWeather } from '../../home/actions'
import * as consts from './consts'

export function setDesktopTableExpanded(desktopTableExpanded: boolean) {
	return {
		type: consts.SET_DESKTOP_TABLE_EXPANDED,
		desktopTableExpanded
	}
}

export function setMobileTableExpanded(mobileTableExpanded: boolean) {
	return {
		type: consts.SET_MOBILE_TABLE_EXPANDED,
		mobileTableExpanded
	}
}

export function setPreferredUnits(preferredUnits: Unit) {
	return function dispatchSetPreferredUnits(dispatch, getState) {
		const prevUnits = getState().weatherVisualizations.preferredUnits
		dispatch({
			type: consts.SET_PREFERRED_UNITS,
			preferredUnits
		})
		if (prevUnits !== preferredUnits) {
			dispatch(fetchWeather())
		}
	}
}

export function setColdTemp(coldTemp: number) {
	return {
		type: consts.SET_COLD_TEMP,
		coldTemp
	}
}

export function setHotTemp(hotTemp: number) {
	return {
		type: consts.SET_HOT_TEMP,
		hotTemp
	}
}

export function setColdTempColor(coldTempColor: string) {
	return {
		type: consts.SET_COLD_TEMP_COLOR,
		coldTempColor
	}
}

export function setHotTempColor(hotTempColor: string) {
	return {
		type: consts.SET_HOT_TEMP_COLOR,
		hotTempColor
	}
}
