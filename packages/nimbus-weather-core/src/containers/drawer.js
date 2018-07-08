import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Drawer from '../components/drawer'
import * as DrawerActions from '../actions/drawer'

function mapStateToProps(state) {
	return {
		router: state.router,
		open: state.drawerIsOpen
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(DrawerActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Drawer)
