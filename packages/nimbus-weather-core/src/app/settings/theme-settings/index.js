// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ThemeActions from './actions'
import ThemeSettings from './theme-settings'

function mapStateToProps(state) {
	return {
		themePaletteType: state.theme.themePaletteType,
		primaryColor: state.theme.primaryColor,
		secondaryColor: state.theme.secondaryColor,
		errorColor: state.theme.errorColor
	}
}

function mapDispatchToProps(dispatch: *) {
	return bindActionCreators(ThemeActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ThemeSettings)
