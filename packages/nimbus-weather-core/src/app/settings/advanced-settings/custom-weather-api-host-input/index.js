// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setCustomWeatherApiHost } from '../../actions'
import CustomWeatherApiHostInput from './custom-weather-api-host-input'

function mapStateToProps(state) {
	return {
		customWeatherApiHost: state.settings.customWeatherApiHost
	}
}

function mapDispatchToProps(dispatch: *) {
	return bindActionCreators({ setCustomWeatherApiHost }, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CustomWeatherApiHostInput)
