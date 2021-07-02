import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'

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

interface ValidationErrors {
	[key: string]: string
}

export function Home() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

	const { signIn } = useAuth()

	const navigation = useNavigation()

	async function handleSignIn() {
		try {
			setValidationErrors({})

			const schema = Yup.object().shape({
				email: Yup.string().required('Email obrigatório').email('O email precisa ser válido'),
				password: Yup.string().required('Senha obrigatória'),
			})

			const data = {
				email,
				password,
			}

			await schema.validate(data, {
				abortEarly: false
			})

			await signIn(data)

			navigation.reset({
				index: 0,
				routes: [{ name: 'Profile' }]
			})
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach(error => {
					setValidationErrors(state => {
						return {
							...state,
							[error.path || '']: error.message
						}
					})
				})

				Toast.show({
					type: 'error',
					text1: 'Erro',
					text2: err.inner[0].message,
				})

				return
			}

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
				error={!!validationErrors['email']}
				value={email}
				onChangeText={text => setEmail(text)}
			/>

			<Input
				placeholder="Senha"
				textContentType="password"
				selectTextOnFocus
				secureTextEntry={!showPassword}
				error={!!validationErrors['password']}
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