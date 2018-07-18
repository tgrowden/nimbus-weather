import {
	SET_THEME_PALETTE_TYPE,
	SET_PRIMARY_COLOR,
	SET_SECONDARY_COLOR,
	SET_ERROR_COLOR
} from '../actions/theme'
import { theme as themeDefaultState } from './default-state'

type actionType = {
	+type: ActionConst
}

export const defaultState = themeDefaultState

export default function(state = defaultState, action: actionType) {
	switch (action.type) {
		case SET_THEME_PALETTE_TYPE:
			return { ...state, ...action }
		case SET_PRIMARY_COLOR:
			return { ...state, ...action }
		case SET_SECONDARY_COLOR:
			return { ...state, ...action }
		case SET_ERROR_COLOR:
			return { ...state, ...action }
		default:
			return state
	}
}
