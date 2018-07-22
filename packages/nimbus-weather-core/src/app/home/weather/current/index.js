// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as HomeActions from '../../actions'
import Current from './current'

function mapStateToProps(state) {
	const { weather } = state.home

	return {
		weather: weather.currently,
		minutely: weather.minutely,
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
)(Current)
