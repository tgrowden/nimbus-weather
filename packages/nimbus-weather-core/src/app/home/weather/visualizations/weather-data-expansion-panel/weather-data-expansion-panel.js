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
import { compose } from 'recompose'

const styles = (theme: MuiTheme) => ({
	root: {
		width: '100%'
	},
	rootXs: {
		// marginTop: theme.spacing.unit * 2
	},
	panelContent: {},
	panelDetails: {
		paddingLeft: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: 0
	}
})

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
			<div
				className={classnames(classes.root, {
					[classes.rootXs]: width === 'xs'
				})}
			>
				<ExpansionPanel
					expanded={expanded}
					CollapseProps={{
						timeout: 350
					}}
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
export default compose(
	withWidth(),
	withStyles(styles)
)(WeatherDataExpansionPanel)
