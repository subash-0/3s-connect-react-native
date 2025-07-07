import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SingOutButton from '@/components/SingOutButton'

const HomeSceen = () => {
  return (
    <SafeAreaView className='flex-1'>
      <Text>HomeSceen</Text>
      <SingOutButton />
    </SafeAreaView>
  )
}

export default HomeSceen