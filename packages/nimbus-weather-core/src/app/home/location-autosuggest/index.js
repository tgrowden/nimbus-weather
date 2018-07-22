import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchWeather, setLocation } from '../actions'
import { setInputValue } from './actions'
import LocationAutosuggest from './location-autosuggest'

function mapStateToProps(state) {
	const { currentLocation } = state.home
	const otherSuggestions =
		currentLocation && currentLocation.lat && currentLocation.lng
			? [
				{
					display_name: currentLocation.name,
					lat: currentLocation.lat,
					lon: currentLocation.lng
				}
			  ]
			: undefined

	return {
		inputValue: state.locationAutosuggest.inputValue,
		location: state.home.location,
		otherSuggestions
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			fetchWeather,
			setLocation,
			setInputValue
		},
		dispatch
	)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LocationAutosuggest)
