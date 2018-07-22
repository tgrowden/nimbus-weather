import { connect } from 'react-redux'
import { setWeatherApiError } from '../actions'
import ErrorDialog from './error-dialog'

function mapStateToProps(state) {
	return {
		open: state.home.weatherApiError,
		title: 'Weather API Error',
		message: 'There was an error with the request to the weather data API.'
	}
}

function mapDispatchToProps(dispatch: *) {
	return {
		onClose: () => {
			dispatch(setWeatherApiError(false))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ErrorDialog)
