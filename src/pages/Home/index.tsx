import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'

import { Button } from '../../components/Button'

import {
	Container,
	Title,
	SubTitle,
	Input,
	ParagraphText,
	ParagraphLinkText,
} from './styles'

export function Home() {
	return (
		<Container>
			<Title>Entrar</Title>
			<SubTitle>O seu passaporte para o futuro</SubTitle>

			<Input
				placeholder="E-mail"
				keyboardType="email-address"
				selectTextOnFocus
				textContentType="emailAddress"
				autoCapitalize="none"
				autoCompleteType="email"
			/>

			<Input
				placeholder="Senha"
				textContentType="password"
				selectTextOnFocus
				secureTextEntry
			/>

			<Button>Login</Button>

			<ParagraphText>
				Esqueceu a senha? <TouchableWithoutFeedback>
					<ParagraphLinkText>Clique aqui</ParagraphLinkText>
				</TouchableWithoutFeedback>
			</ParagraphText>

			<ParagraphText>
				Não possui uma conta? <TouchableWithoutFeedback>
					<ParagraphLinkText>Registrar-se</ParagraphLinkText>
				</TouchableWithoutFeedback>
			</ParagraphText>
		</Container>
	)
}