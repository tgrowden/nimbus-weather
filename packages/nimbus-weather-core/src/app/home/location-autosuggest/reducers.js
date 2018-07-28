import { SET_INPUT_VALUE } from './actions'

export const defaultState = {
	inputValue: '',
	favoriteLocations: {}
}

export default function locationAutosuggest(state = defaultState, action) {
	switch (action.type) {
		case SET_INPUT_VALUE:
			return { ...state, ...action }
		default:
			return state
	}
}
