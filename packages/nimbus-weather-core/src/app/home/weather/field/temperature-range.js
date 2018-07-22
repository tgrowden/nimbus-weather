import React from 'react'
import Field from './'

type Props = {
	min?: number,
	max?: number,
	units: Units
}

const Temperature = (props: Props) => {
	if (!props.min || !props.max) return null
	return (
		<Field
			value={`${props.min.toString()}${
				props.units.temperature
			} - ${props.max.toString()}${props.units.temperature}`}
			label="Temperature Range"
		/>
	)
}

Temperature.defaultProps = {
	min: undefined,
	max: undefined
}

export default Temperature
