// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as HomeActions from '../../actions'
import WeatherErrorModal from './weather-error-modal'

function mapStateToProps(state) {
	return {
		open: state.home.weatherApiError
	}
}

function mapDispatchToProps(dispatch: *) {
	return bindActionCreators(HomeActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WeatherErrorModal)
