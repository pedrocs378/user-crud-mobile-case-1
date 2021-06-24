import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../pages/Home'
import { Register } from '../pages/Register'
import { ForgotPassword } from '../pages/ForgotPassword'

const { Navigator, Screen } = createStackNavigator()

export function Routes() {

	return (
		<Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Screen name="Home" component={Home} />
			<Screen name="Register" component={Register} />
			<Screen name="ForgotPassword" component={ForgotPassword} />
		</Navigator>
	)
}