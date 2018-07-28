export const SET_INPUT_VALUE = 'SET_LOCATION_AUTOSUGGEST_INPUT_VAL'
export const SET_FAVORITE_LOCATIONS = 'SET_FAVORITE_LOCATIONS'

export function setInputValue(inputValue: string) {
	return {
		type: SET_INPUT_VALUE,
		inputValue
	}
}

export function setFavoriteLocations(favoriteLocations: Array<OSMLocation>) {
	return {
		type: SET_FAVORITE_LOCATIONS,
		favoriteLocations
	}
}

export function addFavoriteLocation(location: OSMLocation) {
	return (dispatch, getState) => {
		const { favoriteLocations } = getState().locationAutosuggest

		favoriteLocations[location.osm_id] = location

		return dispatch(setFavoriteLocations(favoriteLocations))
	}
}

export function removeFavoriteLocation(location: OSMLocation) {
	return (dispatch, getState) => {
		const { favoriteLocations } = getState().locationAutosuggest

		if (favoriteLocations[location.osm_id]) {
			delete favoriteLocations[location.osm_id]
		}

		return dispatch(setFavoriteLocations(favoriteLocations))
	}
}
