import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Home from './home'
import * as HomeActions from './actions'
import { setPreferredUnits } from '../settings/weather-visualization-settings/actions'

function mapStateToProps(state) {
	return {
		router: state.router,
		location: state.home.location,
		weather: state.home.weather,
		preferredUnits: state.weatherVisualizations.preferredUnits,
		weatherApiError: state.home.weatherApiError,
		currentLocation: state.home.currentLocation
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ ...HomeActions, setPreferredUnits }, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)
