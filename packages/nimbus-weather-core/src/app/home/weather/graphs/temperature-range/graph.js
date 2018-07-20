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
import graphStyles from '../styles'

type Props = {
	data: Array<{
		time: string,
		High: string | number,
		Low: string | number
	}>,
	timezone: string,
	theme: MuiTheme,
	units: Units
}

const TemperatureRangeGraph = (props: Props) => {
	const { units, data } = props

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

export default withTheme()(TemperatureRangeGraph)
