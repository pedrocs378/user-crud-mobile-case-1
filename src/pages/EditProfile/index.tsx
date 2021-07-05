import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/core'
import { Ionicons } from '@expo/vector-icons'
import * as Yup from 'yup'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { useAuth } from '../../hooks/useAuth'

import { Container, Title, BackButtonText } from './styles'
import { api } from '../../services/api'
import { Keyboard } from 'react-native'

interface ValidationErrors {
	[key: string]: string
}

export function EditProfile() {
	const { user, updateUserData } = useAuth()

	const [name, setName] = useState(user?.name)
	const [email, setEmail] = useState(user?.email)
	const [password, setPassword] = useState('')
	const [old_password, setOldPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [showOldPassword, setShowOldPassword] = useState(false)
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

	const navigation = useNavigation()

	async function handleUpdateUser() {
		try {
			setValidationErrors({})

			const schema = Yup.object().shape({
				name: Yup.string().required('Nome obrigatório').min(3, 'Nome muito curto'),
				email: Yup.string().required('Email obrigatório').email('O email precisa ser válido'),
				old_password: Yup.string(),
				password: Yup.string()
					.when('old_password', {
						is: (value: string) => !!value.length,
						then: Yup.string().required('Digite sua nova senha'),
						otherwise: Yup.string()
					})
			})

			const data = {
				name,
				email,
				old_password,
				password,
			}

			await schema.validate(data, {
				abortEarly: false
			})

			const response = await api.put(`/profile`, data)

			Toast.show({
				type: 'success',
				text1: 'Sucesso',
				text2: 'Perfil atualizado!'
			})

			Keyboard.dismiss()
			setPassword('')
			setOldPassword('')

			updateUserData(response.data)
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
				text2: 'Não foi possivel atualizar o perfil, tente novamente.',
			})
		}
	}

	return (
		<Container>
			<Title>Editar perfil</Title>

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
				placeholder="Senha atual"
				textContentType="password"
				selectTextOnFocus
				secureTextEntry={!showOldPassword}
				error={!!validationErrors['old_password']}
				value={old_password}
				onChangeText={text => setOldPassword(text)}
			>
				<TouchableWithoutFeedback
					onPress={() => setShowOldPassword(state => !state)}
				>
					{showOldPassword ? (
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
				placeholder="Nova senha"
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

			<Button onPress={handleUpdateUser}>Salvar</Button>

			<TouchableWithoutFeedback onPress={() => navigation.goBack()}>
				<BackButtonText>Voltar</BackButtonText>
			</TouchableWithoutFeedback>
		</Container>
	)
}