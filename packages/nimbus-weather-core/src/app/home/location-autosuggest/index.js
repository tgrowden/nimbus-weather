import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchWeather, setLocation } from '../actions'
import {
	setInputValue,
	addFavoriteLocation,
	removeFavoriteLocation
} from './actions'
import LocationAutosuggest from './location-autosuggest'

function mapStateToProps(state) {
	const { currentLocation } = state.home
	const { favoriteLocations } = state.locationAutosuggest

	const otherSuggestions = []

	if (currentLocation && currentLocation.lat && currentLocation.lng) {
		otherSuggestions.push({
			display_name: currentLocation.name,
			lat: currentLocation.lat,
			lon: currentLocation.lng
		})
	}

	const transformedFavorites = Object.keys(favoriteLocations).map(
		locationKey => ({ ...favoriteLocations[locationKey], cached: true })
	)

	return {
		inputValue: state.locationAutosuggest.inputValue,
		location: state.home.location,
		otherSuggestions: [...otherSuggestions, ...transformedFavorites]
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			fetchWeather,
			setLocation,
			setInputValue,
			addFavoriteLocation,
			removeFavoriteLocation
		},
		dispatch
	)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LocationAutosuggest)
