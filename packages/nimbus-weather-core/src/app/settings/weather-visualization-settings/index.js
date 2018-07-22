// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as WeatherVisualizationActions from './actions'
import WeatherVisualizationSettings from './weather-visualization-settings'

function mapStateToProps(state) {
	return {
		hotTemp: state.weatherVisualizations.hotTemp,
		coldTemp: state.weatherVisualizations.coldTemp,
		preferredUnits: state.weatherVisualizations.preferredUnits,
		hotTempColor: state.weatherVisualizations.hotTempColor,
		coldTempColor: state.weatherVisualizations.coldTempColor
	}
}

function mapDispatchToProps(dispatch: *) {
	return bindActionCreators(WeatherVisualizationActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WeatherVisualizationSettings)
