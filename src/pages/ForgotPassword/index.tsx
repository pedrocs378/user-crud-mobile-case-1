import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Yup from 'yup'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import {
	Container,
	Title,
	ParagraphText,
	ParagraphLinkText,
} from './styles'
import { api } from '../../services/api'
import Toast from 'react-native-toast-message'

interface ValidationErrors {
	[key: string]: string
}

export function ForgotPassword() {
	const [email, setEmail] = useState('')
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

	const navigation = useNavigation()

	async function handleSendCode() {
		try {
			setValidationErrors({})

			const schema = Yup.object().shape({
				email: Yup.string().required('Email obrigatório').email('O email precisa ser válido'),
			})

			await schema.validate({ email }, {
				abortEarly: false
			})

			await api.post(`/password/forgot`, { email })

			Toast.show({
				type: 'success',
				text1: 'Sucesso',
				text2: 'Código enviado! Verifique sua caixa de mensagens.'
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
					text2: err.inner[0]?.message,
				})

				return
			}

			Toast.show({
				type: 'error',
				text1: 'Erro',
				text2: 'Não foi possivel enviar o código, tente novamente.',
			})
		}
	}

	return (
		<Container>
			<Title>Esqueci minha senha</Title>

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

			<Button onPress={handleSendCode}>Enviar código</Button>

			<ParagraphText>
				Já possui uma conta? <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
					<ParagraphLinkText>Entrar</ParagraphLinkText>
				</TouchableWithoutFeedback>
			</ParagraphText>
		</Container>
	)
}