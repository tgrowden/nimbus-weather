import React from 'react'
import Field from './'

type Props = {
	value?: number,
	units: Units
}

const NearestStormDistance = (props: Props) => (
	<Field
		value={!!props.value && props.value.toString()}
		units={props.units.nearestStormDistance}
		label="Nearest Storm Distance"
		spaceBeforeUnits
	/>
)

NearestStormDistance.defaultProps = {
	value: undefined
}

export default NearestStormDistance
