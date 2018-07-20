// @flow
import * as React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Link } from 'react-router-dom'

type Props = {
	open: boolean,
	setWeatherApiError: (weatherApiError: boolean) => void
}

class WeatherErrorModal extends React.Component<Props> {
	handleClose = () => {
		this.props.setWeatherApiError(false)
	}

	render() {
		return (
			<Dialog
				open={this.props.open}
				onClose={this.handleClose.bind(this)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Weather API Error</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						There was an error with the request to the weather data API.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleClose.bind(this)} color="secondary">
						Dismiss
					</Button>
					<Button
						onClick={this.handleClose.bind(this)}
						color="primary"
						component={Link}
						to="/settings"
						autoFocus
					>
						Go to Settings
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
}

export default WeatherErrorModal
