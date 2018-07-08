import React from 'react'
import Field from './'

type Props = {
	value?: number,
	units: Units
}

const Temperature = (props: Props) => (
	<Field
		value={!!props.value && props.value.toString()}
		units={props.units.temperature}
		label="Temperature"
	/>
)

Temperature.defaultProps = {
	value: undefined
}

export default Temperature
