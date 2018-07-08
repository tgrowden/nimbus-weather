// @flow
import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import FormHelperText from '@material-ui/core/FormHelperText'

type Props = {
	onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
	value: string,
	label?: string,
	fullWidth?: boolean,
	helperText?: any
}

type State = {
	hidden: boolean
}

class HideableInput extends React.Component<Props, State> {
	static defaultProps = {
		fullWidth: false,
		label: '',
		helperText: ''
	}

	constructor(props: Props) {
		super(props)

		this.state = {
			hidden: true
		}
	}

	handleMouseDownPassword = (event: SyntheticEvent<>) => {
		event.preventDefault()
	}

	handleClickShowPassword() {
		this.setState({ hidden: !this.state.hidden })
	}

	render() {
		const { value, onChange, label, fullWidth, helperText } = this.props

		return (
			<FormControl fullWidth={fullWidth}>
				{!!label && <InputLabel>{label}</InputLabel>}
				<Input
					type={this.state.hidden ? 'password' : 'text'}
					value={value}
					onChange={onChange}
					endAdornment={
						value.length > 0 && (
							<InputAdornment position="end">
								<IconButton
									aria-label="Toggle visibility"
									onClick={this.handleClickShowPassword.bind(this)}
									onMouseDown={this.handleMouseDownPassword}
								>
									{this.state.hidden ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						)
					}
				/>
				{!!helperText && <FormHelperText>{helperText}</FormHelperText>}
			</FormControl>
		)
	}
}

export default HideableInput
