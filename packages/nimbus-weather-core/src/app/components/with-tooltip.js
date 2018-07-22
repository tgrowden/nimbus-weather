// @flow
import * as React from 'react'
import Tooltip from '@material-ui/core/Tooltip'

type TooltipProps = {
	title: string,
	[key: string]: any
}

const withTooltip = ({ title, ...props }: TooltipProps) => (Component: any) => (
	<Tooltip title={title} {...props}>
		{Component}
	</Tooltip>
)

export default withTooltip
