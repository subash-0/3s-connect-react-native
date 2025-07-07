import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import {useSignOut} from '@/hooks/useSignOut'

const SingOutButton = () => {
  const {handleSignOut} = useSignOut();
  return (
    <TouchableOpacity onPress={handleSignOut} >
      <Feather size={24} color={"#E0245E"} name='log-out'  />
    </TouchableOpacity>
  )
}

export default SingOutButton