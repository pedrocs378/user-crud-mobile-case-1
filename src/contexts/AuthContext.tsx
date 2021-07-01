import React, { createContext, ReactNode, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

import { api } from "../services/api";

interface User {
	id: string
	name: string
	email: string
	isAdmin: boolean
}

interface SignInCredentials {
	email: string
	password: string
}

interface AuthContextData {
	user: User | undefined
	signIn: (credentials: SignInCredentials) => Promise<User>
	signOut: () => Promise<void>
	updateUserData: (data: User) => Promise<void>
}

interface AuthProviderProps {
	children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | undefined>()

	useEffect(() => {
		AsyncStorage
			.multiGet(['@Mindeducation:user', '@Mindeducation:token'])
			.then(([storagedUser, storagedToken]) => {
				const [, user] = storagedUser
				const [, token] = storagedToken

				if (user && token) {
					const parsedUser = JSON.parse(user)

					api.defaults.headers.authorization = `Bearer ${token}`
					setUser(parsedUser)
				}

				setUser(undefined)
			})
			.catch(() => {
				Toast.show({
					type: 'error',
					position: 'bottom',
					text1: 'Erro',
					text2: 'Não foi possível obter alguma informação, tente relogar o app.'
				})
			})
	}, [])

	async function signIn({ email, password }: SignInCredentials) {
		const response = await api.post('/sessions', {
			email,
			password
		})

		api.defaults.headers.authorization = `Bearer ${response.data.token}`

		setUser(response.data.user)

		try {
			await AsyncStorage.setItem('@Mindeducation:user', JSON.stringify(response.data.user))
			await AsyncStorage.setItem('@Mindeducation:token', JSON.stringify(response.data.token))
		} catch {
			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'Erro',
				text2: 'Não foi possível salvar alguma informação, tente relogar o app.'
			})
		}

		return response.data.user
	}

	async function signOut() {
		try {
			await AsyncStorage.removeItem('@Mindeducation:user')
			await AsyncStorage.removeItem('@Mindeducation:token')
			setUser(undefined)
		} catch {
			Toast.show({
				type: 'error',
				position: 'bottom',
				text1: 'Erro',
				text2: 'Não foi possível salvar alguma informação, tente relogar o app.'
			})
		}
	}

	async function updateUserData(data: User) {
		setUser(data)
		await AsyncStorage.setItem('@Mindeducation:user', JSON.stringify(data))
	}

	return (
		<AuthContext.Provider value={{ user, signIn, signOut, updateUserData }}>
			{children}
		</AuthContext.Provider>
	)
}