import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchWeather, setLocation } from '../actions'
import LocationAutosuggest from './location-autosuggest'
import Location from '../../models/location'

function mapStateToProps(state) {
	const { currentLocation } = state.home
	const { favoriteLocations } = state.locationAutosuggest

	const otherSuggestions = []

	if (currentLocation && currentLocation.lat && currentLocation.lng) {
		otherSuggestions.push(currentLocation)
	}

	const transformedFavorites = Object.keys(favoriteLocations).map(
		locationKey => {
			const location = new Location(favoriteLocations[locationKey])
			location.cached = true

			return location
		}
	)

	return {
		location: state.home.location,
		otherSuggestions: [...otherSuggestions, ...transformedFavorites]
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			fetchWeather,
			setLocation
		},
		dispatch
	)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LocationAutosuggest)
