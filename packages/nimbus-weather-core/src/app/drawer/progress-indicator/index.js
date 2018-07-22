import { connect } from 'react-redux'
import ProgressIndicator from './progress-indicator'

function mapStateToProps(state) {
	const active = state.home.fetchingWeather || state.home.geolocating

	return {
		active
	}
}

export default connect(
	mapStateToProps
)(ProgressIndicator)
