import React from 'react'
import Field from './'

type Props = {
	value?: number,
	units: Units
}

const PrecipitationProbability = (props: Props) => (
	<Field
		value={!!props.value && (props.value * 100).toFixed().toString()}
		units={props.units.precipProbability}
		label="Precipitation Probability"
	/>
)

PrecipitationProbability.defaultProps = {
	value: undefined
}

export default PrecipitationProbability
