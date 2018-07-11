import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import LazyLoad from 'react-lazyload'

const styles = (theme: MuiTheme) => ({
	root: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		'&:not(:first-of-type)': {
			paddingTop: theme.spacing.unit * 2
		},
		'&:not(:last-of-type)': {
			paddingBottom: theme.spacing.unit * 2
		},
		'&:last-of-type': {
			borderBottom: 'none'
		}
	}
})

type Props = {
	classes: Object,
	children: React.ReactNode
}

const FieldWrapper = ({ classes, children, ...props }: Props) => (
	<LazyLoad>
		<div className={classes.root} {...props}>
			{children}
		</div>
	</LazyLoad>
)

export default withStyles(styles)(FieldWrapper)
