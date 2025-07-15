import { View, Text, ScrollView, Image, RefreshControl } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SingOutButton from '@/components/SingOutButton'
import { userUserSync } from '@/hooks/useUserSync'
import { Ionicons } from '@expo/vector-icons'
import PostComposer from '@/components/PostComposer'
import PostList from '@/components/PostList'
import { usePosts } from '@/hooks/usePost'

const HomeSceen = () => {
 const  {refetch, isRefetching}=  usePosts();
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
    refreshControl={
      <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={"#1DA1F2"} />
    }
    >
      <PostComposer />
      <PostList />
    </ScrollView>
    </SafeAreaView>
  )
}

export default HomeSceen