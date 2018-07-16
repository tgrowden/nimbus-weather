export const SET_DESKTOP_TABLE_EXPANDED: ActionConst =
	'SET_DESKTOP_TABLE_EXPANDED'
export const SET_MOBILE_TABLE_EXPANDED: ActionConst =
	'SET_MOBILE_TABLE_EXPANDED'

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
