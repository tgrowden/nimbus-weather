import * as React from 'react'
import { fade } from '@material-ui/core/styles/colorManipulator'
import WeatherDataTable from '../weather-data-table'
import formatDate from '../../lib/format-date'

type Props = {
	dateFormat: string,
	timezone: string,
	data: HourlyWeatherData,
	displayIntensity: boolean
}

type Field = {
	key: string,
	label?: string,
	numeric?: boolean,
	formatter?: (string | number) => any
}

class PrecipitationTable extends React.Component<Props> {
	getFields(): Array<Field> {
		const { timezone, dateFormat, displayIntensity } = this.props

		const fields = [
			{
				key: 'time',
				label: 'Date',
				formatter: rawTime =>
					formatDate({
						time: rawTime,
						timezone,
						format: dateFormat
					})
			}
		]

		if (displayIntensity) {
			fields.push({
				key: 'precipType',
				label: 'Type',
				formatter: type => {
					if (!type) return 'N/A'

					return `${type.charAt(0).toUpperCase()}${type.slice(1)}`
				},
				sortable: false
			})
		}

		fields.push({
			key: 'precipProbability',
			label: 'Probability',
			numeric: true,
			formatter: (probability, units) =>
				`${(probability * 100).toFixed()}${units.precipProbability}`,
			styleFormatter: ({ value, theme }) => {
				const backgroundColor = fade(theme.palette.secondary.main, value)

				return {
					backgroundColor
				}
			}
		})

		if (displayIntensity) {
			fields.push({
				key: 'precipIntensity',
				label: 'Intensity',
				numeric: true,
				formatter: (item, units) => `${item} ${units.precipIntensity}`
			})
		}

		return fields
	}

	render() {
		const { data, dateFormat, timezone, ...props } = this.props

		return (
			<WeatherDataTable
				data={data.map(datum => ({
					...datum,
					precipProbability: datum.precipProbability || 0,
					precipIntensity: datum.precipIntensity || 0,
					precipType: datum.precipType || ''
				}))}
				fields={this.getFields()}
				{...props}
			/>
		)
	}
}

export default PrecipitationTable
