// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as SettingsActions from '../actions'
import AdvancedSettings from './advanced-settings'

function mapStateToProps(state) {
	return {
		renderIcons: state.settings.renderIcons
	}
}

function mapDispatchToProps(dispatch: *) {
	return bindActionCreators(SettingsActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AdvancedSettings)
