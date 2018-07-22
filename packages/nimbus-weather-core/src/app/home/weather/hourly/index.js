// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as HomeActions from '../../actions'
import Hourly from './hourly'

function mapStateToProps(state) {
	const { weather } = state.home

	return {
		graph: state.home.hourlyGraph,
		weather: weather.hourly,
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
)(Hourly)
