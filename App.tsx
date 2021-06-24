import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading'
import {
  OpenSans_700Bold,
  OpenSans_600SemiBold,
  OpenSans_400Regular,
} from '@expo-google-fonts/open-sans'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins'

import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    OpenSans_700Bold,
    OpenSans_600SemiBold,
    OpenSans_400Regular,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Routes />
    </NavigationContainer>
  );
}
