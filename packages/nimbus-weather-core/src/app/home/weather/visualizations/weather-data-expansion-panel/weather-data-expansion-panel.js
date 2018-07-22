// @flow

import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import withWidth from '@material-ui/core/withWidth'
import classnames from 'classnames'

const styles = {
	root: {
		width: '100%'
	},
	panelContent: {
		paddingLeft: 0,
		paddingRight: 0
	},
	panelDetails: {
		paddingBottom: 0
	}
}

type Props = {
	classes: Object,
	title?: string,
	expandIcon?: React.Node | false,
	children: React.Node,
	width: Width,
	mobileTableExpanded: boolean,
	desktopTableExpanded: boolean,
	setMobileTableExpanded: boolean => void,
	setDesktopTableExpanded: boolean => void
}

class WeatherDataExpansionPanel extends React.Component<Props> {
	static defaultProps = {
		expandIcon: <ExpandMoreIcon />,
		title: 'Weather Data'
	}

	render() {
		const {
			classes,
			title,
			expandIcon,
			children,
			width,
			mobileTableExpanded,
			desktopTableExpanded,
			setMobileTableExpanded,
			setDesktopTableExpanded
		} = this.props
		let expanded
		let onChange

		if (width === 'xs') {
			expanded = mobileTableExpanded
			onChange = setMobileTableExpanded
		} else {
			expanded = desktopTableExpanded
			onChange = setDesktopTableExpanded
		}

		return (
			<div className={classes.root}>
				<ExpansionPanel
					expanded={expanded}
					onChange={() => {
						onChange(!expanded)
					}}
				>
					<ExpansionPanelSummary
						className={classes.panelContent}
						expandIcon={!!expandIcon && expandIcon}
					>
						<Typography variant="title">{title}</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails
						className={classnames(classes.panelContent, classes.panelDetails)}
					>
						{children}
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		)
	}
}
// $FlowFixMe
export default withWidth()(withStyles(styles)(WeatherDataExpansionPanel))
