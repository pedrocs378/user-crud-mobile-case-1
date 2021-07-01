import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/core'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import { useAuth } from '../../hooks/useAuth'

import { Container, Title, BackButtonText } from './styles'

export function EditProfile() {
	const { user } = useAuth()

	const [name, setName] = useState(user?.name)
	const [email, setEmail] = useState(user?.email)
	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

	const navigation = useNavigation()

	return (
		<Container>
			<Title>Editar perfil</Title>

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

			<Button>Salvar</Button>

			<TouchableWithoutFeedback onPress={() => navigation.goBack()}>
				<BackButtonText>Voltar</BackButtonText>
			</TouchableWithoutFeedback>
		</Container>
	)
}