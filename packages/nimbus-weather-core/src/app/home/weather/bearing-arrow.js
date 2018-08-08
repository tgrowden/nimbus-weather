import * as React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import Arrow from '@material-ui/icons/ArrowUpward'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme: MuiTheme) => ({
	arrowWrapper: {
		width: 'fit-content',
		display: 'inline-block',
		marginLeft: theme.spacing.unit / 2,
		...theme.mixins.noSelect
	}
})

type Props = {
	classes: Object,
	bearing: number,
	arrow?: React.Node,
	offset?: number,
	tooltipProps?: {
		label: string,
		unit: string
	}
}

const BearingArrow = ({
	classes,
	bearing,
	arrow,
	offset,
	tooltipProps,
	...props
}: Props) => {
	const calculatedBearing = bearing - offset

	return (
		<Tooltip
			title={`${tooltipProps.label}${calculatedBearing}${tooltipProps.unit}`}
		>
			<div
				className={classes.arrowWrapper}
				style={{ transform: `rotate(${calculatedBearing}deg)` }}
				{...props}
			>
				{arrow}
			</div>
		</Tooltip>
	)
}

BearingArrow.defaultProps = {
	arrow: <Arrow style={{ height: 14, width: 14 }} />,
	offset: 180,
	tooltipProps: {
		label: 'Bearing: ',
		unit: '°'
	}
}

export default withStyles(styles)(BearingArrow)
