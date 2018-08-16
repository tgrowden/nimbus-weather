import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import formatDate from './lib/format-date'
import WeatherIcon from './weather-icon'

type Props = {
	classes: Object,
	summary: string,
	icon: string,
	time: number,
	timezone: string,
	dateFormat?: string
}

const styles = (theme: MuiTheme) => ({
	container: {
		[theme.breakpoints.down('xs')]: {
			paddingLeft: 0,
			paddingRight: 0
		}
	}
})

const Summary = (props: Props) => (
	<React.Fragment>
		<Typography variant="subheading">
			{formatDate({
				time: props.time,
				timezone: props.timezone,
				format: props.dateFormat
			})}
		</Typography>
		<Typography variant="subheading">{props.summary}</Typography>
		<WeatherIcon icon={props.icon} />
	</React.Fragment>
)

Summary.defaultProps = {
	dateFormat: undefined
}

export default withStyles(styles)(Summary)
