// @flow
import { connect } from 'react-redux'
import Alerts from './alerts'

function mapStateToProps(state) {
	const { weather } = state.home

	return {
		alerts: weather.alerts,
		timezone: weather.timezone
	}
}

export default connect(mapStateToProps)(Alerts)
