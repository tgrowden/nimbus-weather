// @flow
import * as React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

type Props = {
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
		const { cardProps, headerProps, content, contentProps, actions, actionsProps } = this.props

		return (
			<Card {...cardProps}>
				{
					headerProps &&
					(
						<CardHeader {...headerProps} />
					)
				}
				{
					content &&
					(
						<CardContent {...contentProps}>
							{ content }
						</CardContent>
					)
				}
				{
					actions &&
					(
						<CardActions {...actionsProps}>
							{ actions }
						</CardActions>
					)
				}
			</Card>
		)
	}
}

export default WeatherCard
