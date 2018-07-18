import { SET_RENDER_ICONS } from '../actions/settings'
import { settings as settingsDefaultState } from './default-state'

type actionType = {
	+type: ActionConst
}

export const defaultState = settingsDefaultState

export default function settings(state = defaultState, action: actionType) {
	switch (action.type) {
		case SET_RENDER_ICONS:
			return { ...state, ...action }
		default:
			return state
	}
}
