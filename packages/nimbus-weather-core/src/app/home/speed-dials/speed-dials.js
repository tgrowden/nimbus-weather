import React from 'react'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import Location from '@material-ui/icons/MyLocation'
import RefreshIcon from '@material-ui/icons/Refresh'

const styles = theme => ({
	speedDial: {
		position: 'fixed',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 3
	},
	loading: {
		animation: 'spin 1s linear infinite'
	},
	'@keyframes spin': {
		'100%': {
			transform: 'rotate(360deg)'
		}
	}
})

type Props = {
	classes: object,
	fetchWeather: () => void,
	fetchingWeather: boolean,
	location: Object,
	timezone: string,
	geolocate: () => void,
	currentLocation: {
		name: string,
		lat: number | null,
		lng: number | null
	},
	geolocating: boolean
}

type State = {
	open: boolean
}

class SpeedDials extends React.Component<Props, State> {
	state = {
		open: false
	}

	handleClick = () => {
		this.setState(state => ({
			open: !state.open
		}))
	}

	handleOpen = () => {
		this.setState({
			open: true
		})
	}

	handleClose = () => {
		this.setState({
			open: false
		})
	}

	get actions() {
		const {
			classes,
			fetchWeather,
			location,
			fetchingWeather,
			timezone,
			currentLocation,
			geolocate,
			geolocating
		} = this.props

		const res = []

		if (!!location.lat && !!location.lng && !!timezone) {
			res.push({
				name: 'Refresh Weather',
				onClick: fetchWeather,
				icon: (
					<RefreshIcon
						className={classnames({
							[classes.loading]: fetchingWeather
						})}
					/>
				),
				ButtonProps: {
					color: 'secondary',
					disabled: fetchingWeather
				}
			})
		}

		res.push({
			name: `${
				currentLocation.lat && currentLocation.lng ? 'Update' : 'Get'
			} Current Location`,
			icon: <Location />,
			onClick: geolocate,
			ButtonProps: {
				color: 'secondary',
				disabled: geolocating
			}
		})

		return res
	}

	render() {
		const { classes } = this.props
		const { open } = this.state

		let isTouch
		if (typeof document !== 'undefined') {
			isTouch = 'ontouchstart' in document.documentElement
		}

		return (
			<SpeedDial
				ariaLabel="SpeedDial"
				className={classes.speedDial}
				icon={<SpeedDialIcon />}
				onBlur={this.handleClose}
				onClick={this.handleClick}
				onClose={this.handleClose}
				onFocus={isTouch ? undefined : this.handleOpen}
				onMouseEnter={isTouch ? undefined : this.handleOpen}
				onMouseLeave={this.handleClose}
				open={open}
			>
				{this.actions.map(action => {
					const { name, ...props } = action

					return <SpeedDialAction key={name} tooltipTitle={name} {...props} />
				})}
			</SpeedDial>
		)
	}
}

export default withStyles(styles)(SpeedDials)
