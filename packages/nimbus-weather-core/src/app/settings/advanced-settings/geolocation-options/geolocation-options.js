import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputAdornment from '@material-ui/core/InputAdornment'

type Props = {
	geolocationHighAccuracy: boolean,
	geolocationTimeout: number,
	setGeolocationHighAccuracy: (geolocationHighAccuracy: boolean) => void,
	setGeolocationTimeout: (geolocationTimeout: number) => number
}

class GeolocationOptions extends React.Component<Props> {
	onHighAccuracyChange = e => {
		this.props.setGeolocationHighAccuracy(e.target.checked)
	}

	onTimeoutChange = e => {
		let { value } = e.target
		value = parseInt(value, 10)

		if (!value) return

		value = parseInt(value, 10)

		if (value < 1) return

		this.props.setGeolocationTimeout(value)
	}

	render() {
		const { geolocationHighAccuracy, geolocationTimeout } = this.props

		return (
			<Grid container spacing={16}>
				<Grid item xs={12} sm={6}>
					<TextField
						value={geolocationTimeout}
						onChange={this.onTimeoutChange.bind(this)}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">Seconds</InputAdornment>
							)
						}}
						type="number"
						label="Timeout"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormGroup row>
						<FormControlLabel
							label="Enable High Accuracy?"
							control={
								<Switch
									checked={geolocationHighAccuracy}
									onChange={this.onHighAccuracyChange.bind(this)}
								/>
							}
						/>
					</FormGroup>
				</Grid>
			</Grid>
		)
	}
}

export default GeolocationOptions
