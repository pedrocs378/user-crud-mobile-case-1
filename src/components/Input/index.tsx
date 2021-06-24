import React, { ReactNode } from 'react'
import { TextInputProps, TouchableWithoutFeedback } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { Container, InputText } from './styles'

type InputProps = TextInputProps & {
	children?: ReactNode
}

export function Input({ children, ...rest }: InputProps) {

	return (
		<Container>
			<InputText {...rest} />

			{children}
		</Container>
	)
}