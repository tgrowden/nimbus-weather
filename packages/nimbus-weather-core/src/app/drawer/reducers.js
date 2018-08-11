import { OPEN_DRAWER, CLOSE_DRAWER, TOGGLE_DRAWER } from './consts'

type actionType = {
	+type: ActionConst
}

export const defaultState = {
	open: false
}

export default function toggleDrawer(
	state = defaultState,
	action: actionType
) {
	switch (action.type) {
		case OPEN_DRAWER:
			return {
				...state,
				open: true,
				...action
			}
		case CLOSE_DRAWER:
			return {
				...state,
				open: false,
				...action
			}
		case TOGGLE_DRAWER:
			return {
				...state,
				open: !state.open,
				...action
			}
		default:
			return state
	}
}
