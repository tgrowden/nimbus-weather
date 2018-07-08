// @flow
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Select, MenuItem } from '@material-ui/core'
import Precipitation from './precipitation'
import TemperatureRange from './temperature-range'
import Temperature from './temperature'
import Pressure from './pressure'

export const PrecipitationGraph = Precipitation
export const TemperatureRangeGraph = TemperatureRange

const styles = (theme: MuiTheme) => ({
	root: {
		marginBottom: theme.spacing.unit * 2,
		maxWidth: theme.breakpoints.values.lg,
		marginLeft: 'auto',
		marginRight: 'auto'
	}
})

const graphOptions = {
	tempRange: 'Temperature Range',
	temp: 'Temperature',
	precip: 'Precipitation',
	pressure: 'Pressure'
}

type GraphOptions = $Keys<typeof graphOptions>

type Props = {
	classes: Object,
	data: WeatherData,
	timezone: string,
	graph: GraphOptions,
	exclude?: Array<GraphOptions>,
	tempRangeDateFormat?: string,
	tempDateFormat?: string,
	precipDateFormat?: string,
	onGraphChange: (graph: GraphOptions) => void
}

class Graphs extends React.Component<Props> {
	static defaultProps = {
		exclude: [],
		tempRangeDateFormat: undefined,
		tempDateFormat: undefined,
		precipDateFormat: 'ddd, MMM D, YYYY'
	}

	render() {
		const {
			classes,
			timezone,
			data,
			exclude,
			tempRangeDateFormat,
			tempDateFormat,
			precipDateFormat,
			graph,
			onGraphChange
		} = this.props

		const options = { ...graphOptions }
		// $FlowFixMe
		exclude.forEach(exclusion => {
			delete options[exclusion]
		})

		return (
			<div className={classes.root}>
				<Grid container>
					<Grid item xs={12} sm={6}>
						<Select
							value={graph}
							onChange={(e: SyntheticEvent<EventTarget>) =>
								/* $FlowFixMe */
								onGraphChange(e.target.value)
							}
						>
							{Object.keys(options).map(key => (
								<MenuItem key={`graph-option-${key}`} value={key}>
									{options[key]}
								</MenuItem>
							))}
						</Select>
					</Grid>
					<Grid item xs={12}>
						{graph === 'tempRange' && (
							<TemperatureRange
								timezone={timezone}
								data={data}
								dateFormat={tempRangeDateFormat}
							/>
						)}
						{graph === 'temp' && (
							<Temperature
								timezone={timezone}
								data={data}
								dateFormat={tempDateFormat}
							/>
						)}
						{graph === 'precip' && (
							<Precipitation
								data={data}
								timezone={timezone}
								dateFormat={precipDateFormat}
							/>
						)}
						{graph === 'pressure' && (
							<Pressure
								data={data}
								timezone={timezone}
								dateFormat={precipDateFormat}
							/>
						)}
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default withStyles(styles)(Graphs)
