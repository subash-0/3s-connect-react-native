import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { usePosts } from '@/hooks/usePost';

const PostList = () => {
  const {currentUser} = useCurrentUser();
  const {posts, isLoading, error ,refetch, toggleLike, deletePost, checkIsLiked} = usePosts();
  if(isLoading){
    return(
      <View className='p-8 items-center'>
        <ActivityIndicator size={"large"} color={"#11DA1F2"} />
        <Text className='text-gray-500 mt-2'>Loading posts....</Text>

      </View>
    )
  }
  return (
    <View>
      <Text>PostList</Text>
    </View>
  )
}

export default PostList