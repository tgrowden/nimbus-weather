import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme: MuiTheme) => ({
	arrowWrapper: {
		width: 'fit-content',
		display: 'inline-block',
		marginLeft: theme.spacing.unit / 2
	}
})

type Props = {
	classes: Object,
	bearing: number,
	arrowCharacter?: string,
	offset?: number,
	tooltipProps?: {
		label: string,
		unit: string
	}
}

const BearingArrow = ({
	classes,
	bearing,
	arrowCharacter,
	offset,
	tooltipProps,
	...props
}: Props) => {
	const calculatedBearing = bearing - offset

	return (
		<Tooltip title={`${tooltipProps.label}${calculatedBearing}${tooltipProps.unit}`}>
			<div
				className={classes.arrowWrapper}
				style={{ transform: `rotate(${calculatedBearing}deg)` }}
				{...props}
			>
				{arrowCharacter}
			</div>
		</Tooltip>
	)
}

BearingArrow.defaultProps = {
	arrowCharacter: '↖',
	offset: 135,
	tooltipProps: {
		label: 'Bearing: ',
		unit: '°'
	}
}

export default withStyles(styles)(BearingArrow)
