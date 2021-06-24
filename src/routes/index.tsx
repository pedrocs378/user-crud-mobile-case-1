import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../pages/Home'
import { Register } from '../pages/Register'

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
		</Navigator>
	)
}