import React from 'react'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
	CartesianGrid
} from 'recharts'
import { withStyles } from '@material-ui/core/styles'
import graphStyles from '../styles'
import TooltipContent from '../tooltip-content'

const styles = (theme: MuiTheme) => ({
	root: {
		marginTop: theme.spacing.unit * 3
	}
})

type Props = {
	classes: Object,
	theme: MuiTheme,
	data: WeatherData,
	units: Units,
	displayIntensity: boolean
}

const CustomTooltip = (props: { payload: Array<Object>, units: Units }) => {
	if (!!props && !!props.payload[0]) {
		const { units } = props
		const payload = props.payload.map(i => {
			switch (i.name) {
				case 'Precipitation Probability':
					return {
						...i,
						value: `${i.value.toFixed()}%`,
						name: `Chance of ${i.payload.type || 'Precipitation'}`
					}
				/* eslint-disable no-case-declarations */
				case 'Precipitation Intensity':
					let value
					if (i.value > 0 && !!i.payload.precipIntensityError) {
						value = `${i.value} (± ${i.payload.precipIntensityError}) ${
							units.precipIntensity
						}`
					} else {
						value = `${i.value} ${units.precipIntensity}`
					}
					return {
						...i,
						value
					}
				/* eslint-enable no-case-declarations */
				default:
					return i
			}
		})

		return <TooltipContent {...props} payload={payload} />
	}

	return <TooltipContent {...props} />
}

class PrecipitationGraph extends React.Component<Props> {
	render() {
		const { classes, theme, units, data, displayIntensity } = this.props

		const {
			responsiveContainer,
			lineChart,
			primaryLine,
			secondaryLine,
			xAxis,
			yAxis,
			tooltip,
			legend,
			cartesianGrid
		} = graphStyles(theme)

		return (
			<div className={classes.root}>
				<ResponsiveContainer {...responsiveContainer} aspect={4}>
					<LineChart data={data} {...lineChart} syncId="precip" aspect={4}>
						<Line
							type="monotone"
							dataKey="Precipitation Probability"
							{...primaryLine}
						/>
						<XAxis
							dataKey="time"
							{...xAxis}
							orientation={displayIntensity ? 'top' : 'bottom'}
						/>
						<YAxis domain={[0, 100]} {...yAxis} unit="%" />
						<Tooltip
							{...tooltip}
							content={props => <CustomTooltip {...props} units={units} />}
						/>
						<CartesianGrid {...cartesianGrid} />
						<Legend
							{...legend}
							verticalAlign={displayIntensity ? 'top' : 'bottom'}
						/>
					</LineChart>
				</ResponsiveContainer>
				{displayIntensity && (
					<ResponsiveContainer {...responsiveContainer} aspect={4}>
						<LineChart data={data} {...lineChart} syncId="precip">
							<Line
								type="monotone"
								dataKey="Precipitation Intensity"
								{...secondaryLine}
							/>
							<XAxis dataKey="time" {...xAxis} />
							<YAxis {...yAxis} />
							<Tooltip
								{...tooltip}
								content={props => <CustomTooltip {...props} units={units} />}
							/>
							<CartesianGrid {...cartesianGrid} />
							<Legend {...legend} />
						</LineChart>
					</ResponsiveContainer>
				)}
			</div>
		)
	}
}

export default withStyles(styles, { withTheme: true })(PrecipitationGraph)
