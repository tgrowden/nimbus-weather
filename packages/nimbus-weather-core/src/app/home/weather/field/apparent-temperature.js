import React from 'react'
import Field from './'

type Props = {
	value?: number,
	units: Units
}

const ApparentTemperature = (props: Props) => (
	<Field
		value={!!props.value && props.value.toString()}
		units={props.units.apparentTemperature}
		label="Feels Like"
	/>
)

ApparentTemperature.defaultProps = {
	value: undefined
}

export default ApparentTemperature
