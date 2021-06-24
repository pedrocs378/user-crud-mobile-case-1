import React from 'react'
import { ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { colors } from '../../styles/colors'

import developerActivityImg from '../../assets/developer-activity.png'

import {
	Container,
	Header,
	LogoutButton,
	LogoutButtonText,
	ProfileContent,
	ProfileContentImage,
	ProfileUserContent,
	UserWelcomeText,
	UserWelcomeSpanText,
	UserEmail,
	EditProfileButton,
	EditProfileButtonText,
} from './styles'

export function Profile() {

	return (
		<ScrollView contentContainerStyle={{ flex: 1 }}>
			<Container>
				<Header>
					<LogoutButton>
						<LogoutButtonText>Logout</LogoutButtonText>

						<Ionicons
							name="md-arrow-back"
							color={colors.blue500}
							size={25}
						/>
					</LogoutButton>
				</Header>
				<ProfileContent>
					<ProfileContentImage source={developerActivityImg} />

					<ProfileUserContent>
						<UserWelcomeText>
							Bem vindo, <UserWelcomeSpanText>Pedro César</UserWelcomeSpanText>
						</UserWelcomeText>

						<UserEmail>
							pedrocs378@gmail.com
						</UserEmail>

						<EditProfileButton>
							<EditProfileButtonText>Editar perfil</EditProfileButtonText>
						</EditProfileButton>
					</ProfileUserContent>
				</ProfileContent>
			</Container>
		</ScrollView>
	)
}