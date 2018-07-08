import React from 'react'
import Field from './'

type Props = {
	value?: number,
	units: Units
}

const CloudCover = (props: Props) => (
	<Field
		value={!!props.value && (props.value * 100).toFixed().toString()}
		units={props.units.cloudCover}
		label="Cloud Coverage"
	/>
)

CloudCover.defaultProps = {
	value: undefined
}

export default CloudCover
