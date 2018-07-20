import React from 'react'
import Field from './'

type Props = {
	value?: string
}

const Summary = (props: Props) => <Field value={props.value} label="Summary" />

Summary.defaultProps = {
	value: ''
}

export default Summary
