import * as consts from './consts'

export function setFavoriteLocations(favoriteLocations: Array<OSMLocation>) {
	return {
		type: consts.SET_FAVORITE_LOCATIONS,
		favoriteLocations
	}
}

export function addFavoriteLocation(location: OSMLocation) {
	return (dispatch, getState) => {
		const { favoriteLocations } = getState().locationAutosuggest

		favoriteLocations[location.id] = location

		return dispatch(setFavoriteLocations(favoriteLocations))
	}
}

export function removeFavoriteLocation(location: OSMLocation) {
	return (dispatch, getState) => {
		const { favoriteLocations } = getState().locationAutosuggest

		if (favoriteLocations[location.id]) {
			delete favoriteLocations[location.id]
		}

		return dispatch(setFavoriteLocations(favoriteLocations))
	}
}
