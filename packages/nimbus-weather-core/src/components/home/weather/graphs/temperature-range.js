import React from 'react'
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
	CartesianGrid
} from 'recharts'
import { withTheme } from '@material-ui/core/styles'
import formatDate from '../lib/format-date'
import getUnits from '../lib/units'
import graphStyles from './styles'

type Props = {
	data: WeatherData,
	timezone: string,
	dateFormat?: string,
	theme: MuiTheme
}

const TemperatureRangeGraph = (props: Props) => {
	const data = props.data.map(datum => ({
		...datum,
		time: formatDate({
			time: datum.time,
			timezone: props.timezone,
			format: props.dateFormat
		}),
		High: datum.temperatureHigh,
		Low: datum.temperatureLow
	}))

	const units = getUnits()
	const {
		responsiveContainer,
		legend,
		tooltip,
		xAxis,
		yAxis,
		chart,
		primaryArea,
		secondaryArea,
		cartesianGrid
	} = graphStyles(props.theme)

	return (
		<ResponsiveContainer {...responsiveContainer}>
			<AreaChart data={data} {...chart}>
				<XAxis dataKey="time" {...xAxis} />
				<YAxis {...yAxis} unit={units.temperature} />
				<Tooltip {...tooltip} />
				<Legend {...legend} />
				<Area
					dataKey="High"
					fill={props.theme.palette.primary.main}
					unit={units.temperatureHigh}
					{...primaryArea}
				/>
				<Area
					dataKey="Low"
					fill={props.theme.palette.secondary.main}
					unit={units.temperatureLow}
					{...secondaryArea}
				/>
				<CartesianGrid {...cartesianGrid} />
			</AreaChart>
		</ResponsiveContainer>
	)
}

TemperatureRangeGraph.defaultProps = {
	dateFormat: 'ddd, MMM D, YYYY'
}

export default withTheme()(TemperatureRangeGraph)
