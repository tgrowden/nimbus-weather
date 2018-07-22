import React from 'react'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { setCurrentLocationError } from '../actions'
import ErrorDialog from './error-dialog'

function mapStateToProps(state) {
	return {
		open: state.home.currentLocationError,
		title: 'Geolocation Error',
		message: (
			<React.Fragment>
				<Typography>There was an error getting your location.</Typography>
				{!!state.home.currentLocationErrorMessage && (
					<Typography style={{ marginTop: '.5rem' }}>
						<strong>Error: </strong>
						{state.home.currentLocationErrorMessage}
					</Typography>
				)}
			</React.Fragment>
		)
	}
}

function mapDispatchToProps(dispatch: *) {
	return {
		onClose: () => {
			dispatch(setCurrentLocationError(false))
		}
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ErrorDialog)
