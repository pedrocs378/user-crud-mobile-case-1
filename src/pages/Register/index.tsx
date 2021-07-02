import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { api } from '../../services/api'

import {
	Container,
	Title,
	ParagraphText,
	ParagraphLinkText,
} from './styles'

interface ValidationErrors {
	[key: string]: string
}

export function Register() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [password_confirmation, setPasswordConfirmation] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

	const navigation = useNavigation()

	async function handleSaveRegister() {
		try {
			setValidationErrors({})

			const schema = Yup.object().shape({
				name: Yup.string().required('Nome obrigatório'),
				email: Yup.string().required('Email obrigatório').email('O email precisa ser válido'),
				password: Yup.string().required('Senha obrigatória').min(6, 'A senha precisa ter no mínimo 6 caracteres'),
				password_confirmation: Yup.string()
					.oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais')
			})

			const data = {
				name,
				email,
				password,
				password_confirmation
			}

			await schema.validate(data, {
				abortEarly: false
			})

			await api.post('/users', {
				name,
				email,
				password,
				password_confirmation
			})

			Toast.show({
				type: 'success',
				text1: 'Sucesso',
				text2: 'Cadastro realizado com sucesso'
			})

			navigation.goBack()
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
				text2: 'Não foi possivel realizar o cadastro, tente novamente.'
			})
		}
	}

	return (
		<ScrollView contentContainerStyle={{ flex: 1 }}>
			<Container>
				<Title>Cadastre-se</Title>

				<Input
					placeholder="Nome"
					selectTextOnFocus
					textContentType="name"
					autoCapitalize="words"
					autoCompleteType="name"
					error={!!validationErrors['name']}
					value={name}
					onChangeText={text => setName(text)}
				/>

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

				<Input
					placeholder="Confirmar senha"
					textContentType="password"
					selectTextOnFocus
					secureTextEntry={!showPasswordConfirmation}
					error={!!validationErrors['password_confirmation']}
					value={password_confirmation}
					onChangeText={text => setPasswordConfirmation(text)}
				>
					<TouchableWithoutFeedback
						onPress={() => setShowPasswordConfirmation(state => !state)}
					>
						{showPasswordConfirmation ? (
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

				<Button onPress={handleSaveRegister}>Cadastrar</Button>

				<ParagraphText>
					Já possui uma conta? <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
						<ParagraphLinkText>Entrar</ParagraphLinkText>
					</TouchableWithoutFeedback>
				</ParagraphText>
			</Container>
		</ScrollView>
	)
}