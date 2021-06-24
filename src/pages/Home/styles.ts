import styled from 'styled-components/native'

import { colors } from '../../styles/colors'
import { fonts } from '../../styles/fonts'

export const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;

	padding: 0 26px;
`
export const Title = styled.Text`
	text-transform: uppercase;
	color: ${colors.blue800};
	font-family: ${fonts.openSans700};
	font-size: 36px;
`

export const SubTitle = styled.Text`
	font-family: ${fonts.openSans400};
	font-size: 16px;
	color: ${colors.blue800};
	opacity: 0.5;

	margin-top: 16px;
	margin-bottom: 60px;
`

export const Input = styled.TextInput`
	width: 100%;
	height: 50px;
	border-bottom-width: 1px;
	border-bottom-color: rgba(3, 1, 76, 0.2);

	margin-bottom: 46px;

	font-family: ${fonts.openSans600};
	color: ${colors.blue800};
	font-size: 16px;
`

export const ParagraphText = styled.Text`
	font-size: 14px;
	font-family: ${fonts.openSans400};
	color: ${colors.blue800};

	margin-top: 32px;
`

export const ParagraphLinkText = styled.Text`
	color: ${colors.cyan};
`