
import { useClerk } from '@clerk/clerk-expo'
import React from 'react'
import { Button, Text, View } from 'react-native'

type Props = {}

const HomeScreen = (props: Props) => {
  const {signOut} = useClerk()
  return (
    <View>
      <Text> HomeScreen</Text>
      
       <Button
       onPress={()=>signOut()}
        title='Sign Out' />
      </View>
   
  )
}

export default HomeScreen