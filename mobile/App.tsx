import { Text, View, StatusBar } from 'react-native'

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-950">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Text className="text-4xl font-bold text-zinc-50">Marlison Mourão</Text>
    </View>
  )
}
