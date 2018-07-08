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

const TemperatureGraph = (props: Props) => {
	const data = props.data.map(datum => ({
		...datum,
		time: formatDate({
			time: datum.time,
			timezone: props.timezone,
			format: props.dateFormat
		}),
		Temperature: datum.temperature
	}))

	const units = getUnits()
	const {
		responsiveContainer,
		legend,
		tooltip,
		xAxis,
		yAxis,
		lineChart,
		primaryLine,
		cartesianGrid
	} = graphStyles(props.theme)

	return (
		<ResponsiveContainer {...responsiveContainer}>
			<LineChart data={data} {...lineChart}>
				<XAxis dataKey="time" {...xAxis} />
				<YAxis {...yAxis} unit={units.temperature} />
				<Tooltip {...tooltip} />
				<Legend {...legend} />
				<Line
					background={false}
					dataKey="Temperature"
					unit={units.temperature}
					{...primaryLine}
				/>
				<CartesianGrid {...cartesianGrid} />
			</LineChart>
		</ResponsiveContainer>
	)
}

TemperatureGraph.defaultProps = {
	dateFormat: 'ddd h:mm a'
}

export default withTheme()(TemperatureGraph)
