import { useEffect, useState } from 'react'
import { styled } from 'nativewind'
import { ImageBackground, StatusBar } from 'react-native'
import * as SecureStore from 'expo-secure-store'

import { BaiJamjuree_700Bold, useFonts } from '@expo-google-fonts/bai-jamjuree'
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import blurBg from '@assets/bg-blur.png'
import Stripes from '@assets/stripes.svg'
import { SplashScreen, Stack } from 'expo-router'

const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isUserAuthentication, setIsUserAuthentication] = useState<
    undefined | boolean
  >(undefined)

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsUserAuthentication(!!token)
    })
  }, [])

  if (!fontsLoaded) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 bg-gray-900 "
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStripes className="absolute left-2" />

      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthentication} />
        <Stack.Screen name="new" />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  )
}
