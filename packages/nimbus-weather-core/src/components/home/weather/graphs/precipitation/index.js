// @flow
import * as React from 'react'
import withWidth from '@material-ui/core/withWidth'
import formatDate from '../../lib/format-date'
import getUnits from '../../lib/units'
import DesktopPrecipitation from './desktop'
import MobilePrecipitation from './mobile'

type Props = {
	data: WeatherData,
	timezone: string,
	dateFormat?: string,
	width: Width
}

class PrecipitationVisualization extends React.Component<Props>
	implements WeatherDataVisualization {
	units: Units

	static defaultProps = {
		dateFormat: 'h:mm a'
	}

	constructor(props) {
		super(props)

		this.units = getUnits()
	}

	get displayIntensity() {
		return !this.props.data.every(i => i.precipIntensity === 0)
	}

	get data() {
		const { data, timezone, dateFormat } = this.props

		return data.map(datum => ({
			time: formatDate({
				time: datum.time,
				timezone,
				format: dateFormat
			}),
			'Precipitation Intensity': datum.precipIntensity,
			'Precipitation Probability': datum.precipProbability
				? datum.precipProbability * 100
				: 0,
			// $FlowFixMe
			precipIntensityError: datum.precipIntensityError || 0,
			type: datum.precipType
		}))
	}

	render() {
		const { width } = this.props

		const { displayIntensity } = this

		if (width === 'xs') {
			return (
				<MobilePrecipitation
					units={this.units}
					data={this.props.data}
					dateFormat={this.props.dateFormat}
					timezone={this.props.timezone}
					displayIntensity={displayIntensity}
				/>
			)
		}

		return (
			<DesktopPrecipitation
				units={this.units}
				data={this.data}
				displayIntensity={displayIntensity}
			/>
		)
	}
}

export default withWidth()(PrecipitationVisualization)
