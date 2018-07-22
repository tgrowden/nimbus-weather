import React from 'react'
import Field from './'

type Props = {
	value?: number
}

const UVIndex = (props: Props) => (
	<Field value={!!props.value && props.value.toString()} label="UV Index" />
)

UVIndex.defaultProps = {
	value: undefined
}

export default UVIndex
