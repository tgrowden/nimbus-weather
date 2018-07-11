// @flow
import React, { Component } from 'react'
import {
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Grid
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import WeatherTabs from './weather'
import LocationAutosuggest from '../location-autosuggest'
import WeatherErrorModal from './weather/weather-error-modal'

type Props = {
	activeTab: number,
	classes: Object,
	location: Object,
	fetchWeather: (coords: Coords, preferredUnits: Unit) => void,
	setLocation: (location: Object) => void,
	setActiveTab: (activeTab: number) => void,
	weather: Weather,
	fetchingWeather: boolean,
	preferredUnits: Unit,
	setPreferredUnits: (preferredUnits: Unit, coords: Coords) => void
}

const styles = (theme: MuiTheme) => ({
	root: {},
	errorRoot: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: '40vh',
		textAlign: 'center'
	},
	hidden: {
		display: 'none'
	},
	suggestions: {
		width: '100%'
	},
	suggestion: {
		padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px`,
		cursor: 'pointer'
	},
	activeSuggestion: {
		backgroundColor: theme.palette.action.selected
	},
	autocompleteWrapper: {
		marginBottom: theme.spacing.unit * 2
	},
	unitsSelectWrapper: {
		marginBottom: theme.spacing.unit * 2,
		maxWidth: 300
	}
})

class Home extends Component<Props> {
	static defaultProps = {
		preferredUnits: 'us'
	}

	handleUnitChange(e) {
		const preferredUnits = e.target.value
		this.props.setPreferredUnits(
			// $FlowFixMe
			preferredUnits,
			this.props.location.coords
		)
	}

	onLocationChange = location => {
		this.props.setLocation(location)

		this.props.fetchWeather(location.coords, this.props.preferredUnits)
	}

	render() {
		const {
			classes,
			location,
			weather,
			activeTab,
			setActiveTab,
			fetchingWeather,
			preferredUnits
		} = this.props

		const { coords } = location

		return (
			<React.Fragment>
				<WeatherErrorModal />
				<div className={classes.root}>
					<div className={classes.autocompleteWrapper}>
						<Grid container spacing={8}>
							<Grid item xs={12}>
								<LocationAutosuggest
									location={location}
									onChange={this.onLocationChange}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<FormControl fullWidth>
									<InputLabel>Preferred Units</InputLabel>
									<Select
										value={preferredUnits}
										onChange={this.handleUnitChange.bind(this)}
									>
										<MenuItem value="us">USA</MenuItem>
										<MenuItem value="ca">Canada</MenuItem>
										<MenuItem value="uk2">United Kingdom</MenuItem>
										<MenuItem value="si">SI</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</div>
					{!!coords.lat &&
						!!coords.lng &&
						!!weather &&
						!!weather.timezone && (
						<WeatherTabs
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							weather={weather}
							coords={coords}
							fetchWeather={this.props.fetchWeather.bind(
								this,
								coords,
								this.props.preferredUnits
							)}
							fetchingWeather={fetchingWeather}
						/>
					)}
				</div>
			</React.Fragment>
		)
	}
}

export default withStyles(styles)(Home)
