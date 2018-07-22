import React from 'react'
import TextField from '@material-ui/core/TextField'

export default function renderInput(inputProps) {
	const { InputProps, classes, ref, ...other } = inputProps

	return (
		<TextField
			InputProps={{
				inputRef: ref,
				classes: {
					root: classes.inputRoot
				},
				...InputProps
			}}
			{...other}
		/>
	)
}
