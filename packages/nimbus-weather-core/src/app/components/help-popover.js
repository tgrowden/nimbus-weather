// @flow
import React from 'react'
import Popover from '@material-ui/core/Popover'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Help from '@material-ui/icons/Help'
import classnames from 'classnames'
import type { Node } from 'react'
import withTypography from './with-typography'

const styles = (theme: MuiTheme) => ({
	popoverContent: {
		padding: theme.spacing.unit
	},
	iconButton: {
		width: 'fit-content',
		height: 'fit-content',
		'&:hover': {
			color: 'inherit'
		}
	},
	smIcon: {
		width: 24,
		height: 24
	},
	mdIcon: {
		width: 32,
		height: 32
	},
	lgIcon: {
		width: 48,
		height: 48
	}
})

type PopoverOrigin = {
	horizontal: 'left' | 'center' | 'right' | number,
	vertical: 'top' | 'center' | 'bottom' | number
}

type Props = {
	classes: Object,
	children: Node,
	size?: 'sm' | 'md' | 'lg',
	anchorOrigin: PopoverOrigin,
	transformOrigin: PopoverOrigin
}

type State = {
	open: boolean
}

class HelpPopover extends React.Component<Props, State> {
	anchorEl: HTMLElement

	static defaultProps = {
		anchorOrigin: {
			vertical: 'top',
			horizontal: 'center'
		},
		transformOrigin: {
			vertical: 'bottom',
			horizontal: 'center'
		},
		size: 'md'
	}

	state = {
		open: false
	}

	toggleOpen(open) {
		this.setState({ open })
	}

	render() {
		const {
			children,
			classes,
			size,
			anchorOrigin,
			transformOrigin,
			...props
		} = this.props
		const { open } = this.state

		return (
			<React.Fragment>
				<IconButton
					onClick={this.toggleOpen.bind(this, true)}
					buttonRef={node => {
						this.anchorEl = node
					}}
					className={classnames(classes.iconButton)}
				>
					<Help
						className={classnames({
							[classes.smIcon]: size === 'sm',
							[classes.mdIcon]: size === 'md',
							[classes.lgIcon]: size === 'lg'
						})}
					/>
				</IconButton>
				<Popover
					open={open}
					anchorEl={this.anchorEl}
					onClose={this.toggleOpen.bind(this, false)}
					anchorOrigin={anchorOrigin}
					transformOrigin={transformOrigin}
					{...props}
				>
					<div className={classes.popoverContent}>
						{withTypography(children)}
					</div>
				</Popover>
			</React.Fragment>
		)
	}
}

export default withStyles(styles)(HelpPopover)
