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
	<Grid container spacing={8} className={props.classes.container}>
		<Grid item xs={12} sm={4}>
			<Typography variant="subheading">
				{formatDate({
					time: props.time,
					timezone: props.timezone,
					format: props.dateFormat
				})}
			</Typography>
		</Grid>
		<Grid item xs={12} sm={4}>
			<Typography variant="subheading">{props.summary}</Typography>
		</Grid>
		<Grid item xs={12} sm={4}>
			<WeatherIcon icon={props.icon} />
		</Grid>
	</Grid>
)

Summary.defaultProps = {
	dateFormat: undefined
}

export default withStyles(styles)(Summary)
