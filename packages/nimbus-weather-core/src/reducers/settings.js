import { SET_RENDER_ICONS } from '../actions/settings'

type actionType = {
	+type: ActionConst
}

export const defaultState = {
	renderIcons: true
}

export default function settings(state = defaultState, action: actionType) {
	switch (action.type) {
		case SET_RENDER_ICONS:
			return { ...state, ...action }
		default:
			return state
	}
}
