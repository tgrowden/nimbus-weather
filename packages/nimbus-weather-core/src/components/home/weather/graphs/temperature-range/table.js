import * as React from 'react'
import { fade } from '@material-ui/core/styles/colorManipulator'
import WeatherDataTable from '../weather-data-table'
import formatDate from '../../lib/format-date'
import findPercentageWithinRange from '../../lib/find-percentage-within-range'

type Props = {
	dateFormat: string,
	timezone: string,
	data: HourlyWeatherData
}

class TemperatureRangeTable extends React.Component<Props> {
	render() {
		const { data, dateFormat, timezone, ...props } = this.props

		const lowDataset = data.map(datum => datum.temperatureLow)
		const highDataset = data.map(datum => datum.temperatureHigh)

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
						key: 'temperatureLow',
						label: 'Low',
						formatter: (low, units) => `${low}${units.temperatureLow}`,
						styleFormatter: ({ value, theme }) => {
							const backgroundColor = fade(
								theme.palette.primary.main,
								1 -
									findPercentageWithinRange({
										dataSet: lowDataset,
										value: parseFloat(value)
									})
							)

							return { backgroundColor }
						}
					},
					{
						key: 'temperatureHigh',
						label: 'High',
						formatter: (high, units) => `${high}${units.temperatureHigh}`,
						styleFormatter: ({ value, theme }) => {
							const backgroundColor = fade(
								theme.palette.secondary.main,
								findPercentageWithinRange({
									dataSet: highDataset,
									value: parseFloat(value)
								})
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

export default TemperatureRangeTable
