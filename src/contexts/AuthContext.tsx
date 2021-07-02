import React, { createContext, ReactNode, useState, useEffect, useCallback } from "react";
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
	loading: boolean
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
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function loadStoragedData(): Promise<void> {
			const [user, token] = await AsyncStorage.multiGet(['@Mindeducation:user', '@Mindeducation:token'])

			if (token[1] && user[1]) {
				api.defaults.headers.authorization = `Bearer ${token[1]}`

				setUser(JSON.parse(user[1]))
			}

			setLoading(false)
		}

		loadStoragedData()
	}, [])

	const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
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
	}, [])

	const signOut = useCallback(async () => {
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
	}, [])

	const updateUserData = useCallback(async (data: User) => {
		setUser(data)
		await AsyncStorage.setItem('@Mindeducation:user', JSON.stringify(data))
	}, [])

	return (
		<AuthContext.Provider value={{ user, loading, signIn, signOut, updateUserData }}>
			{children}
		</AuthContext.Provider>
	)
}