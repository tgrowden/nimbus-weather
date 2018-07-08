import React from 'react'
import Field from './'

type Props = {
	value?: number,
	units: Units
}

const Visibility = (props: Props) => (
	<Field
		value={!!props.value && props.value.toString()}
		units={props.units.visibility}
		label="Visibility"
		spaceBeforeUnits
	/>
)

Visibility.defaultProps = {
	value: undefined
}

export default Visibility
