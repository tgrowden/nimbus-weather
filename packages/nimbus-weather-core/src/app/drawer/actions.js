// @flow
import * as consts from './consts'

export function openDrawer() {
	return {
		type: consts.OPEN_DRAWER
	}
}

export function closeDrawer() {
	return {
		type: consts.CLOSE_DRAWER
	}
}

export function toggleDrawer() {
	return {
		type: consts.TOGGLE_DRAWER
	}
}
