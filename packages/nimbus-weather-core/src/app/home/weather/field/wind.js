// @flow
import React from 'react'
import Field from './'
import BearingArrow from '../bearing-arrow'

type Props = {
	windSpeed?: number,
	windBearing?: number,
	units: Units
}

const Wind = ({ windSpeed, windBearing, units }: Props) => {
	if (!windBearing || !windSpeed) return null

	const value = (
		<React.Fragment>
			<span>
				{windSpeed} {units.windSpeed}
			</span>
			<BearingArrow bearing={windBearing} />
		</React.Fragment>
	)

	return (
		<Field
			value={value}
			label="Wind"
			valueTypographyProps={{
				component: 'div'
			}}
		/>
	)
}

Wind.defaultProps = {
	windSpeed: undefined,
	windBearing: undefined
}

export default Wind
