import React, { ReactNode } from 'react'
import { TextInputProps } from 'react-native'

import { Container, InputText } from './styles'

type InputProps = TextInputProps & {
	error?: boolean
	children?: ReactNode
}

export function Input({ error = false, children, ...rest }: InputProps) {
	return (
		<Container isErrored={error}>
			<InputText {...rest} />

			{children}
		</Container>
	)
}