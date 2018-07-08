import React from 'react'
import Field from './'

type Props = {
	value?: number,
	units: Units
}

const NearestStormBearing = (props: Props) => (
	<Field
		value={!!props.value && props.value.toString()}
		units={props.units.nearestStormBearing}
		label="Nearest Storm Bearing"
	/>
)

NearestStormBearing.defaultProps = {
	value: undefined
}

export default NearestStormBearing
