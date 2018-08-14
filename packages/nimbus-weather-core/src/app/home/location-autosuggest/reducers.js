import { SET_FAVORITE_LOCATIONS } from './consts'

export const defaultState = {
	favoriteLocations: {}
}

export default function locationAutosuggest(state = defaultState, action) {
	switch (action.type) {
		case SET_FAVORITE_LOCATIONS:
			return { ...state, ...action }
		default:
			return state
	}
}
