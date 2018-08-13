import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

type Props = {
	allowAnalytics: boolean | null,
	setAllowAnalytics: (allowAnalytics: boolean) => void
}

class AnalyticsOptions extends React.Component<Props> {
	handleAllowAnalyticsChange = (e, checked: boolean) => {
		this.props.setAllowAnalytics(checked)
	}

	render() {
		const { allowAnalytics } = this.props

		return (
			<Grid container spacing={16}>
				<FormGroup row>
					<FormControlLabel
						label="Allow Analytics Tracking"
						control={
							<Switch
								checked={!!allowAnalytics}
								onChange={this.handleAllowAnalyticsChange.bind(this)}
							/>
						}
					/>
				</FormGroup>
			</Grid>
		)
	}
}

export default AnalyticsOptions
