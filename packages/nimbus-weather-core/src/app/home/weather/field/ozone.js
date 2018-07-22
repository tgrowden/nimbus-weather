import React from 'react'
import Field from './'

type Props = {
	value?: number,
	units: Units
}

const Ozone = (props: Props) => (
	<Field
		value={!!props.value && props.value.toString()}
		units={props.units.ozone}
		label="Ozone"
		spaceBeforeUnits
	/>
)

Ozone.defaultProps = {
	value: undefined
}

export default Ozone
