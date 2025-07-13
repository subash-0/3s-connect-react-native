import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SingOutButton from '@/components/SingOutButton'
import { userUserSync } from '@/hooks/useUserSync'
import { Ionicons } from '@expo/vector-icons'
import PostComposer from '@/components/PostComposer'

const HomeSceen = () => {
  userUserSync();
  return (
    <SafeAreaView className='flex-1'>
    <View className='flex-row justify-between items-center px-4 py-3 border-b-2 border-gray-200' >
       <Image 
       source={require("../../assets/images/logo.png")}
       className='w-8 h-8'
       resizeMode='contain'
       />
        <Text className='text-xl font-bold  text-gray-900'>HOME</Text>
      <SingOutButton />

    </View>

    <ScrollView 
    showsVerticalScrollIndicator={false}
    className='flex-1'
    contentContainerStyle={{paddingBottom:80}}
    >
      <PostComposer />
    </ScrollView>
    </SafeAreaView>
  )
}

export default HomeSceen