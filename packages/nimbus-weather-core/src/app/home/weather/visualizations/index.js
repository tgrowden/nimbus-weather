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
		marginRight: 'auto',
		width: '100%'
	},
	graphWrapper: {
		width: '100%',
		paddingTop: theme.spacing.unit * 2,
		[theme.breakpoints.up('sm')]: {
			width: '99%',
			marginLeft: 'auto',
			marginRight: 'auto'
		},
		...theme.mixins.noSelect
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
	onGraphChange: (graph: GraphOptions) => void,
	only?: GraphOptions
}

class Graphs extends React.Component<Props> {
	options: Array<GraphOptions>

	static defaultProps = {
		exclude: [],
		tempRangeDateFormat: undefined,
		tempDateFormat: undefined,
		precipDateFormat: 'ddd, MMM D',
		only: undefined
	}

	constructor(props) {
		super(props)

		this.setOptions()
	}

	setOptions = () => {
		const { only, exclude = [] } = this.props
		let options = []

		if (only) {
			options = [only]
		} else {
			Object.keys(graphOptions).forEach(opt => {
				if (exclude.indexOf(opt) === -1) {
					options.push(opt)
				}
			})
		}

		this.options = options
	}

	render() {
		const {
			classes,
			timezone,
			data,
			tempRangeDateFormat,
			tempDateFormat,
			precipDateFormat,
			graph,
			onGraphChange
		} = this.props

		const { options } = this

		return (
			<div className={classes.root}>
				<Grid container>
					{options.length > 1 && (
						<Grid item xs={12} sm={6}>
							<Select
								value={graph}
								onChange={(e: SyntheticEvent<EventTarget>) =>
									/* $FlowFixMe */
									onGraphChange(e.target.value)
								}
							>
								{options.map(key => (
									<MenuItem key={`graph-option-${key}`} value={key}>
										{graphOptions[key]}
									</MenuItem>
								))}
							</Select>
						</Grid>
					)}
					<Grid item xs={12}>
						<div className={classes.graphWrapper}>
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
									// $FlowFixMe
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
									// $FlowFixMe
									data={data}
									timezone={timezone}
									dateFormat={precipDateFormat}
								/>
							)}
						</div>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default withStyles(styles)(Graphs)
