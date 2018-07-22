import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Settings from './settings'
import * as SettingsActions from './actions'

function mapStateToProps(state) {
	return {
		router: state.router
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(SettingsActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Settings)
