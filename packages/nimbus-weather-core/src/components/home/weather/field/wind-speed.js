import React from 'react'
import Field from './'

type Props = {
	value?: number,
	units: Units
}

const WindSpeed = (props: Props) => (
	<Field
		value={!!props.value && props.value.toString()}
		units={props.units.windSpeed}
		label="Wind Speed"
		spaceBeforeUnits
	/>
)

WindSpeed.defaultProps = {
	value: undefined
}

export default WindSpeed
