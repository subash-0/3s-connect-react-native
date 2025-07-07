import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
const TRENDNG_TOPICS = [
  { topic: "#ReactNative", tweets: "125k" },
  { topic: "#ExpoRouter", tweets: "89k" },
  { topic: "#TypeScript", tweets: "172k" },
  { topic: "#TailwindCSS", tweets: "140k" },
  { topic: "#Firebase", tweets: "98k" },
  { topic: "#NextJS", tweets: "220k" },
  
];


const SearchScreen = () => {
  return (
   <SafeAreaView className='flex-1'>
      <View className='px-4 py-3 border-b border-gray-300'>
        <View className='flex-row items-center bg-gray-200 rounded-full px-4'>
          <Feather  name='search' size={20} color="#657786" />
          <TextInput
            placeholder='Search Connects'
            className='flex-1 ml-3 text-base'
            placeholderTextColor="#657786"
          />

        </View>
      </View>

      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
       <View className='px-4'>
         <Text className='text-xl font-bold text-gray-800 mb-4'>
          Trending For You !
        </Text>
        {
          TRENDNG_TOPICS?.map((item,index)=>(
            <TouchableOpacity key={index} className='py-1 border-b border-gray-100'>
              <Text className='text-gray-800 text-lg font-semibold'>{item?.topic}</Text>
              <Text className='text-sm text-gray-500'>{item?.tweets} follwers</Text>

            </TouchableOpacity>
          ))
        }
       </View>


      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen