import { OPEN_DRAWER, CLOSE_DRAWER, TOGGLE_DRAWER } from '../actions/drawer'

export type drawerOpenStateType = {
	+open: boolean
}

type actionType = {
	+type: ActionConst
}

export default function toggleDrawer(
	state: boolean = false,
	action: actionType
) {
	switch (action.type) {
		case OPEN_DRAWER:
			return true
		case CLOSE_DRAWER:
			return false
		case TOGGLE_DRAWER:
			return !state
		default:
			return state
	}
}
