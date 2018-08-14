import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AnalyticsPermissionDialog from './analytics-permission-dialog'
import { setAllowAnalytics } from '../../settings/actions'

function mapStateToProps(state) {
	return {
		allowAnalytics: state.settings.allowAnalytics
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ setAllowAnalytics }, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AnalyticsPermissionDialog)
