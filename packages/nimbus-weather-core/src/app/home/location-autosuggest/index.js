import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as HomeActions from '../actions'
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
		location: state.home.location,
		otherSuggestions
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(HomeActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LocationAutosuggest)
