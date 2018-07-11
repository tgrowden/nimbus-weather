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
import graphStyles from '../styles'

type Props = {
	data: Array<>,
	units: Units,
	theme: MuiTheme
}

const TemperatureGraph = ({ data, units, theme }: Props) => {
	const {
		responsiveContainer,
		legend,
		tooltip,
		xAxis,
		yAxis,
		lineChart,
		primaryLine,
		cartesianGrid
	} = graphStyles(theme)

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

export default withTheme()(TemperatureGraph)
