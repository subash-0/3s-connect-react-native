import { View, Text, Alert, Image } from 'react-native'
import React from 'react'
import { Post, User } from '@/types'
interface postCardProps {
  post: Post,
  onLike :(postId:string)=>void,
  onDelete:(postId:string)=>void,
  isLiked?:boolean,
  currentUser: User
}

const PostCard = ({post, onLike, onDelete, isLiked, currentUser}: postCardProps) => {
  const isOwnPost =  post.user._id === currentUser._id;
  const hadleDelete = () =>{
    Alert.alert("Delete Post", "Are you sure want to delete it ?",[
      {text:"Cancel", style:"cancel"},
      {text:"Delete",
       style:"destructive",
       onPress:()=> onDelete(post._id),
       
      }
    ])
  }
  console.log("Curretn User",post)
  return (
    <View className='border-b-2 border-gray-400 bg-white'>
      <View className='flex-row p-4'>
        <Image source={{uri: currentUser.profilePicture}}
        className='w-12 h-12 rounded-full mr-3 border'
        alt='user_image'
        />
  <Text>Hello</Text>
      </View>
    </View>
  )
}

export default PostCard