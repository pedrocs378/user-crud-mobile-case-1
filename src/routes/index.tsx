import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from '../pages/Home'
import { Register } from '../pages/Register'
import { ForgotPassword } from '../pages/ForgotPassword'
import { Profile } from '../pages/Profile'
import { EditProfile } from '../pages/EditProfile'

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

			<Screen name="Profile" component={Profile} />
			<Screen name="EditProfile" component={EditProfile} />
		</Navigator>
	)
}