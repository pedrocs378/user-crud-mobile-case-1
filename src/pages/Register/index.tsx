import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { api } from '../../services/api'

import {
	Container,
	Title,
	ParagraphText,
	ParagraphLinkText,
} from './styles'

export function Register() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [password_confirmation, setPasswordConfirmation] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

	const navigation = useNavigation()

	async function handleSaveRegister() {
		try {
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
		} catch {
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

				<Input
					placeholder="Confirmar senha"
					textContentType="password"
					selectTextOnFocus
					secureTextEntry={!showPasswordConfirmation}
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