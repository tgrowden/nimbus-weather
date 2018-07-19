import React from 'react'
import classnames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import Location from '@material-ui/icons/MyLocation'
import RefreshIcon from '@material-ui/icons/Refresh'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as HomeActions from '../../actions/home'

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
	coords: Coords,
	timezone: string,
	geolocate: () => void,
	currentLocation: {
		name: string,
		lat: number | null,
		lng: number | null
	}
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
		const { classes, fetchWeather, coords, fetchingWeather, timezone, currentLocation, geolocate } = this.props

		const res = []

		if (
			!!coords.lat &&
			!!coords.lng &&
			!!timezone
		) {
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
					color: 'secondary'
				}
			})
		}

		res.push({
			name: `${currentLocation.lat && currentLocation.lng ? 'Update' : 'Get'} Current Location`,
			icon: <Location color="inherit" />,
			onClick: geolocate
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

					return (
						<SpeedDialAction
							key={name}
							tooltipTitle={name}
							{...props}
						/>
					)
				})}
			</SpeedDial>
		)
	}
}

function mapStateToProps(state) {
	return {
		coords: state.home.location.coords,
		fetchingWeather: state.home.fetchingWeather,
		timezone: state.home.weather.timezone,
		currentLocation: state.home.currentLocation
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(HomeActions, dispatch)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(SpeedDials))
