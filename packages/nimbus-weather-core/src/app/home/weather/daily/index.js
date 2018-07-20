// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as HomeActions from '../../actions'
import Daily from './daily'

function mapStateToProps(state) {
	return {
		graph: state.home.dailyGraph
	}
}

function mapDispatchToProps(dispatch: *) {
	return bindActionCreators(HomeActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Daily)
