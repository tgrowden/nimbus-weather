import React from 'react'
import Field from './'

type Props = {
	value?: number,
	units: Units
}

const DewPoint = (props: Props) => (
	<Field
		value={!!props.value && props.value.toString()}
		units={props.units.dewPoint}
		label="Dew Point"
	/>
)

DewPoint.defaultProps = {
	value: undefined
}

export default DewPoint
