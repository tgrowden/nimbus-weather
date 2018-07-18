import { OPEN_DRAWER, CLOSE_DRAWER, TOGGLE_DRAWER } from '../actions/drawer'
import { drawer as drawerDefaultState } from './default-state'

type actionType = {
	+type: ActionConst
}

export default function toggleDrawer(
	state = drawerDefaultState,
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
