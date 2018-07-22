import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Drawer from './drawer'
import * as DrawerActions from './actions'

function mapStateToProps(state) {
	return {
		router: state.router,
		open: state.drawer.open,
		fetchingWeather: state.home.fetchingWeather
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(DrawerActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Drawer)
