// @flow
import * as React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme: MuiTheme) => ({
	root: {
		'&:not(:last-of-type)': {
			marginBottom: theme.spacing.unit * 2
		}
	}
})

type Props = {
	classes: Object,
	cardProps?: Object,
	header?: React.Node,
	headerProps?: Object,
	content?: React.Node,
	contentProps?: Object,
	actions?: React.Node,
	actionsProps?: Object
}

class WeatherCard extends React.Component<Props> {
	static defaultProps = {
		cardProps: undefined,
		header: undefined,
		headerProps: undefined,
		content: undefined,
		contentProps: undefined,
		actions: undefined,
		actionsProps: undefined
	}

	render() {
		const {
			classes,
			cardProps,
			headerProps,
			content,
			contentProps,
			actions,
			actionsProps
		} = this.props

		return (
			<div className={classes.root}>
				<Card {...cardProps}>
					{headerProps && <CardHeader {...headerProps} />}
					{content && <CardContent {...contentProps}>{content}</CardContent>}
					{actions && <CardActions {...actionsProps}>{actions}</CardActions>}
				</Card>
			</div>
		)
	}
}

export default withStyles(styles)(WeatherCard)
