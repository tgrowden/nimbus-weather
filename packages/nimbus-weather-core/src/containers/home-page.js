import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Home from '../components/home'
import * as HomeActions from '../actions/home'
import fetchWeather from '../lib/fetch-weather'

function mapStateToProps(state) {
	return {
		router: state.router,
		location: state.home.location,
		weather: state.home.weather,
		activeTab: state.home.activeTab,
		fetchingWeather: state.home.fetchingWeather,
		preferredUnits: state.home.preferredUnits,
		weatherApiError: state.home.weatherApiError
	}
}

function updateWeather(dispatch, { lat, lng }, preferredUnits) {
	fetchWeather({ lat, lng }, preferredUnits)
		.then(weather =>
			dispatch({
				type: HomeActions.SET_WEATHER,
				weather: {
					fetched: Date.now(),
					...weather
				}
			})
		)
		.catch(() => {
			dispatch({ type: HomeActions.WEATHER_FETCH_ERROR })
		})
}

function mapDispatchToProps(dispatch) {
	return {
		...bindActionCreators(HomeActions, dispatch),
		fetchWeather: (coords, preferredUnits) => {
			updateWeather(dispatch, coords, preferredUnits)
		},
		setPreferredUnits: (preferredUnits, coords) => {
			dispatch({
				type: HomeActions.SET_PREFERRED_UNITS,
				preferredUnits
			})
			if (coords.lat && coords.lng) {
				updateWeather(dispatch, coords, preferredUnits)
			}
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home)
