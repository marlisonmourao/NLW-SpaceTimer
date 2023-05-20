import { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, View, Text, Image } from 'react-native'
import Icon from '@expo/vector-icons/Feather'
import { Link, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import dayjs from 'dayjs'

import Logo from '@assets/nlwSpaceTime.svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { api } from '../src/lib/api'
import ptBr from 'dayjs/locale/pt-br'

dayjs.locale(ptBr)

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createAt: string
}

export default function Memories() {
  const [memories, setMemories] = useState<Memory[]>([])
  const { bottom, top } = useSafeAreaInsets()

  const router = useRouter()

  async function signOut() {
    await SecureStore.deleteItemAsync('token')

    router.push('/')
  }

  async function loadMemories() {
    const token = await SecureStore.getItemAsync('token')

    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setMemories(response.data)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
      showsVerticalScrollIndicator={false}
    >
      <View className="mt-4 flex-row items-center justify-between px-8">
        <Logo />

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={signOut}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>

          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((memory) => {
          return (
            <View className="space-y-4" key={memory.id}>
              <View className="flex-row items-center gap-2">
                <View className="h-px w-5 bg-gray-50" />
                <Text className="text-xm font-body text-gray-100">
                  {dayjs(memory.createAt).format('D [de] MMMM[, ] YYYY')}
                </Text>
              </View>

              <View className="space-y-4 px-8">
                <Image
                  source={{ uri: memory.coverUrl }}
                  alt=""
                  className="aspect-video w-full rounded-lg"
                />

                <Text className="font-body text-base leading-relaxed text-gray-100">
                  {memory.excerpt}
                </Text>

                <Link href="/memories/id" asChild>
                  <TouchableOpacity className="flex-row items-center gap-2">
                    <Text className="font-body text-sm text-gray-200">
                      Ler mais
                    </Text>
                    <Icon name="arrow-right" size={16} color="#9e9ea0" />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}
