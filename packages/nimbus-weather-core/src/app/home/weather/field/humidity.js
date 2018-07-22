import React from 'react'
import Field from './'

type Props = {
	value?: number,
	units: Units
}

const Humidity = (props: Props) => (
	<Field
		value={!!props.value && (props.value * 100).toFixed().toString()}
		units={props.units.humidity}
		label="Humidity"
	/>
)

Humidity.defaultProps = {
	value: undefined
}

export default Humidity
