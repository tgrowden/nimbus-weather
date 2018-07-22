// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as HomeActions from '../../actions'
import Daily from './daily'

function mapStateToProps(state) {
	const { weather } = state.home

	return {
		graph: state.home.dailyGraph,
		weather: weather.daily,
		timezone: weather.timezone,
		units: (weather && weather.flags && weather.flags.units) || undefined
	}
}

function mapDispatchToProps(dispatch: *) {
	return bindActionCreators(HomeActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Daily)
