import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as HomeActions from '../actions'
import SpeedDials from './speed-dials'

function mapStateToProps(state) {
	return {
		location: state.home.location,
		fetchingWeather: state.home.fetchingWeather,
		timezone: state.home.weather.timezone,
		currentLocation: state.home.currentLocation,
		geolocating: state.home.geolocating
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(HomeActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SpeedDials)
