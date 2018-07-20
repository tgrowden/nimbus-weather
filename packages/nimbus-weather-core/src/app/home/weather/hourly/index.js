// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as HomeActions from '../../actions'
import Hourly from './hourly'

function mapStateToProps(state) {
	return {
		graph: state.home.hourlyGraph
	}
}

function mapDispatchToProps(dispatch: *) {
	return bindActionCreators(HomeActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Hourly)
