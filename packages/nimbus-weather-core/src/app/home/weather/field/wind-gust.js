import React from 'react'
import Field from './'

type Props = {
	value?: number,
	units: Units
}

const WindGust = (props: Props) => (
	<Field
		value={!!props.value && props.value.toString()}
		units={props.units.windGust}
		label="Wind Gust"
		spaceBeforeUnits
	/>
)

WindGust.defaultProps = {
	value: undefined
}

export default WindGust
