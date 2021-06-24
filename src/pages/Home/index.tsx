import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import {
	Container,
	Title,
	SubTitle,
	ParagraphText,
	ParagraphLinkText,
} from './styles'

export function Home() {
	const [showPassword, setShowPassword] = useState(false)

	const navigation = useNavigation()

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
				secureTextEntry={!showPassword}
			>
				<TouchableWithoutFeedback
					onPress={() => setShowPassword(state => !state)}
				>
					{showPassword ? (
						<Ionicons
							name="eye-off"
							color="rgba(3, 1, 76, 0.2)"
							size={24}
						/>
					) : (
						<Ionicons
							name="eye"
							color="rgba(3, 1, 76, 0.2)"
							size={24}
						/>
					)}
				</TouchableWithoutFeedback>
			</Input>

			<Button>Login</Button>

			<ParagraphText>
				Esqueceu a senha? <TouchableWithoutFeedback onPress={() => navigation.navigate('ForgotPassword')}>
					<ParagraphLinkText>Clique aqui</ParagraphLinkText>
				</TouchableWithoutFeedback>
			</ParagraphText>

			<ParagraphText>
				Não possui uma conta? <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
					<ParagraphLinkText>Registrar-se</ParagraphLinkText>
				</TouchableWithoutFeedback>
			</ParagraphText>
		</Container>
	)
}