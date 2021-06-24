import styled from "styled-components/native";

import { colors } from "../../styles/colors";
import { fonts } from "../../styles/fonts";

export const Container = styled.View`
	width: 100%;
	border-bottom-width: 0.8px;
	border-bottom-color: rgba(3, 1, 76, 0.2);

	margin-bottom: 46px;

	flex-direction: row;
	align-items: center;
`

export const InputText = styled.TextInput`
	flex: 1;
	height: 50px;
	font-family: ${fonts.openSans600};
	color: ${colors.blue800};
	font-size: 16px;
	margin-right: 5px;
`