import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Home from '../components/home'
import * as HomeActions from '../actions/home'
import { setPreferredUnits } from '../actions/weather-visualizations'

function mapStateToProps(state) {
	return {
		router: state.router,
		location: state.home.location,
		weather: state.home.weather,
		activeTab: state.home.activeTab,
		fetchingWeather: state.home.fetchingWeather,
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
