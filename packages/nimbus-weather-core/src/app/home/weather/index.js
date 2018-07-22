import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Weather from './weather'
import * as HomeActions from '../actions'

function mapStateToProps(state) {
	return {
		weather: state.home.weather,
		activeTab: state.home.activeTab
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(HomeActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Weather)
