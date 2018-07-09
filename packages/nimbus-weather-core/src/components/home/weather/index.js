// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
// $FlowFixMe flow-mono error maybe?
import { differenceInMilliseconds } from 'date-fns'
import classnames from 'classnames'
import { AppBar, Tabs, Tab, Paper, Button, Tooltip } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh'
import Current from './current'
import Hourly from './hourly'
import Daily from './daily'
import Alerts from './alerts'

const styles = (theme: MuiTheme) => ({
	root: {
		maxWidth: `calc(100vw - ${theme.spacing.unit * 6}px)`
	},
	buttonContainer: {
		position: 'fixed',
		bottom: theme.spacing.unit * 2,
		right: theme.spacing.unit * 2
	},
	loading: {
		animation: 'spin 1s linear infinite'
	},
	'@keyframes spin': {
		'100%': {
			transform: 'rotate(360deg)'
		}
	},
	weatherContainer: {
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'column',
		marginLeft: 'auto',
		marginRight: 'auto',
		padding: theme.spacing.unit * 4
	}
})

type Props = {
	classes: Object,
	weather: Weather,
	fetchWeather: () => void,
	activeTab: number,
	setActiveTab: (activeTab: number) => void,
	fetchingWeather: boolean
}

class WeatherApp extends React.Component<Props> {
	static get durationBeforeNewFetch() {
		return 600000 // 10 minutes
	}

	componentWillMount() {
		const fetched: number = this.props.weather.fetched || 0
		const now = Date.now()
		const diff = differenceInMilliseconds(Date.now(), fetched)
		if (fetched > now || diff > WeatherApp.durationBeforeNewFetch) {
			this.props.fetchWeather()
		}
	}

	render() {
		const {
			classes,
			weather,
			activeTab,
			setActiveTab,
			fetchWeather,
			fetchingWeather
		} = this.props

		const units = (weather && weather.flags && weather.flags.units) || undefined

		return (
			<div className={classes.root}>
				<Paper>
					<AppBar position="static">
						<Tabs
							value={activeTab}
							onChange={(e, tabIndex) => {
								setActiveTab(tabIndex)
							}}
						>
							<Tab label="Current" />
							<Tab label="Hourly" />
							<Tab label="Daily" />
							<Tab
								label="Alerts"
								disabled={!weather.alerts || !weather.alerts.length}
							/>
						</Tabs>
					</AppBar>
					<div className={classes.weatherContainer}>
						{activeTab === 0 && (
							<Current
								weather={weather.currently}
								minutely={weather.minutely}
								timezone={weather.timezone}
								units={units}
							/>
						)}
						{activeTab === 1 && (
							<Hourly
								weather={weather.hourly}
								timezone={weather.timezone}
								units={units}
							/>
						)}
						{activeTab === 2 && (
							<Daily
								weather={weather.daily}
								timezone={weather.timezone}
								units={units}
							/>
						)}
						{activeTab === 3 && (
							<Alerts alerts={weather.alerts} timezone={weather.timezone} />
						)}
					</div>
				</Paper>
				<div className={classes.buttonContainer}>
					<Tooltip title="Refresh Weather" placement="left">
						<Button variant="fab" onClick={fetchWeather} color="secondary">
							<RefreshIcon
								className={classnames({
									[classes.loading]: fetchingWeather
								})}
							/>
						</Button>
					</Tooltip>
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(WeatherApp)
