import * as React from 'react'
import { fade } from '@material-ui/core/styles/colorManipulator'
import WeatherDataTable from '../weather-data-table'
import formatDate from '../../lib/format-date'
import getTemperatureCellFade from '../../lib/get-temperature-cell-fade'

type Props = {
	dateFormat: string,
	timezone: string,
	data: HourlyWeatherData
}

class TemperatureTable extends React.Component<Props> {
	render() {
		const { data, dateFormat, timezone, ...props } = this.props

		return (
			<WeatherDataTable
				data={data}
				fields={[
					{
						key: 'time',
						label: 'Date',
						formatter: time =>
							formatDate({
								time,
								timezone,
								format: dateFormat
							})
					},
					{
						key: 'temperature',
						label: 'Temperature',
						numeric: true,
						formatter: (item, units) => `${item}${units.temperature}`,
						styleFormatter: ({ value, theme }) => {
							const backgroundColor = fade(
								theme.palette.hot.main,
								getTemperatureCellFade(value)
							)

							return { backgroundColor }
						}
					}
				]}
				{...props}
			/>
		)
	}
}

export default TemperatureTable
