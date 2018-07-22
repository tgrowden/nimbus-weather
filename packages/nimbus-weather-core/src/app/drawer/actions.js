// @flow
export const CLOSE_DRAWER: ActionConst = 'CLOSE_DRAWER'
export const OPEN_DRAWER: ActionConst = 'OPEN_DRAWER'
export const TOGGLE_DRAWER: ActionConst = 'TOGGLE_DRAWER'

export function openDrawer() {
	return {
		type: OPEN_DRAWER
	}
}

export function closeDrawer() {
	return {
		type: CLOSE_DRAWER
	}
}

export function toggleDrawer() {
	return {
		type: TOGGLE_DRAWER
	}
}
