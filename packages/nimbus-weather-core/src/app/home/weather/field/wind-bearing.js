import React from 'react'
import Field from './'

type Props = {
	value?: number,
	units: Units
}

const WindBearing = (props: Props) => (
	<Field
		value={!!props.value && props.value.toString()}
		units={props.units.windBearing}
		label="Wind Bearing"
	/>
)

WindBearing.defaultProps = {
	value: undefined
}

export default WindBearing
