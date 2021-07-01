import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { useAuth } from '../../hooks/useAuth'

import {
	Container,
	Title,
	SubTitle,
	ParagraphText,
	ParagraphLinkText,
} from './styles'

export function Home() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const { signIn } = useAuth()

	const navigation = useNavigation()

	async function handleSignIn() {
		if (!email.trim() && !password.trim()) {
			Toast.show({
				type: 'error',
				text1: 'Erro',
				text2: 'Entre com suas credenciais',
			})

			return
		}

		try {
			await signIn({
				email,
				password
			})

			Toast.show({
				type: 'success',
				text1: 'Sucesso',
				text2: 'Você já pode acessar o app',
			})

			navigation.reset({
				index: 0,
				routes: [{ name: 'Profile' }]
			})
		} catch (err) {
			Toast.show({
				type: 'error',
				text1: 'Erro',
				text2: 'Não foi possivel entrar na sua conta',
			})
		}
	}

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
				value={email}
				onChangeText={text => setEmail(text)}
			/>

			<Input
				placeholder="Senha"
				textContentType="password"
				selectTextOnFocus
				secureTextEntry={!showPassword}
				value={password}
				onChangeText={text => setPassword(text)}
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

			<Button onPress={handleSignIn}>
				Login
			</Button>

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