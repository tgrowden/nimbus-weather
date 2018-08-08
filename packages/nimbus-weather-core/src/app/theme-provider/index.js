import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ThemeProvider from './theme-provider'
import * as ThemeActions from '../settings/theme-settings/actions'
import colors from '../utils/colors'

function mapStateToProps(state) {
	return {
		theme: {
			palette: {
				type: state.theme.themePaletteType,
				primary: colors[state.theme.primaryColor],
				secondary: colors[state.theme.secondaryColor],
				error: colors[state.theme.errorColor],
				cold: colors[state.weatherVisualizations.coldTempColor],
				hot: colors[state.weatherVisualizations.hotTempColor]
			},
			mixins: {
				noSelect: {
					'-moz-user-select': 'none',
					'-webkit-user-select': 'none',
					'-ms-user-select': 'none',
					'user-select': 'none',
					'-o-user-select': 'none'
				}
			}
		}
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(ThemeActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ThemeProvider)
