// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WeatherVisualizationsActions from '../../../../settings/weather-visualization-settings/actions'
import WeatherDataExpansionPanel from './weather-data-expansion-panel'

function mapStateToProps(state) {
	return {
		mobileTableExpanded: state.weatherVisualizations.mobileTableExpanded,
		desktopTableExpanded: state.weatherVisualizations.desktopTableExpanded
	}
}

function mapDispatchToProps(dispatch: any) {
	return bindActionCreators(WeatherVisualizationsActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WeatherDataExpansionPanel)
