export const SET_DESKTOP_TABLE_EXPANDED: ActionConst =
	'SET_DESKTOP_TABLE_EXPANDED'
export const SET_MOBILE_TABLE_EXPANDED: ActionConst =
	'SET_MOBILE_TABLE_EXPANDED'
export const SET_PREFERRED_UNITS: ActionConst = 'SET_PREFERRED_UNITS'
export const SET_COLD_TEMP: ActionConst = 'SET_COLD_TEMP'
export const SET_HOT_TEMP: ActionConst = 'SET_HOT_TEMP'

export function setDesktopTableExpanded(desktopTableExpanded: boolean) {
	return {
		type: SET_DESKTOP_TABLE_EXPANDED,
		desktopTableExpanded
	}
}

export function setMobileTableExpanded(mobileTableExpanded: boolean) {
	return {
		type: SET_MOBILE_TABLE_EXPANDED,
		mobileTableExpanded
	}
}

export function setPreferredUnits(preferredUnits: Unit) {
	return {
		type: SET_PREFERRED_UNITS,
		preferredUnits
	}
}

export function setColdTemp(coldTemp: number) {
	return {
		type: SET_COLD_TEMP,
		coldTemp
	}
}

export function setHotTemp(hotTemp: number) {
	return {
		type: SET_HOT_TEMP,
		hotTemp
	}
}
