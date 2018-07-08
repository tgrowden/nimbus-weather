import React from 'react'
import Field from './'

type Props = {
	value?: number,
	units: Units
}

const PrecipitationIntensity = (props: Props) => {
	if (!props.value) return null
	return (
		<Field
			value={!!props.value && props.value.toString()}
			units={props.units.precipIntensity}
			label="Precipitation Intensity"
			spaceBeforeUnits
		/>
	)
}

PrecipitationIntensity.defaultProps = {
	value: undefined
}

export default PrecipitationIntensity
