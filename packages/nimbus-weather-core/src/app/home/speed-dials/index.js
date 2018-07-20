import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as HomeActions from '../actions'
import SpeedDials from './speed-dials'

function mapStateToProps(state) {
	return {
		coords: state.home.location.coords,
		fetchingWeather: state.home.fetchingWeather,
		timezone: state.home.weather.timezone,
		currentLocation: state.home.currentLocation
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(HomeActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SpeedDials)
