// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setAllowAnalytics } from '../../actions'
import AnalyticsOptions from './analytics-options'

function mapStateToProps(state) {
	return {
		allowAnalytics: state.settings.allowAnalytics
	}
}

function mapDispatchToProps(dispatch: *) {
	return bindActionCreators({ setAllowAnalytics }, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AnalyticsOptions)
