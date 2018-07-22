// @flow
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
	setGeolocationHighAccuracy,
	setGeolocationTimeout
} from '../../actions'
import GeolocationOptions from './geolocation-options'

function mapStateToProps(state) {
	const { geolocationHighAccuracy, geolocationTimeout } = state.settings

	return {
		geolocationHighAccuracy,
		geolocationTimeout
	}
}

function mapDispatchToProps(dispatch: *) {
	return bindActionCreators(
		{ setGeolocationHighAccuracy, setGeolocationTimeout },
		dispatch
	)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GeolocationOptions)
