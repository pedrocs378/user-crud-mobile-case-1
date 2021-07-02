import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Profile } from '../pages/Profile'
import { EditProfile } from '../pages/EditProfile'

const { Navigator, Screen } = createStackNavigator()

export function AppRoutes() {

	return (
		<Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Screen name="Profile" component={Profile} />
			<Screen name="EditProfile" component={EditProfile} />
		</Navigator>
	)
}