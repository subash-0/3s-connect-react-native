import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { usePosts } from '@/hooks/usePost';
import { Post } from '@/types';
import PostCard from './PostCard';

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
  if(error) {
     return <View className='p-8 items-center'>
       
        <Text className='text-gray-500 mt-2'>Failed to Load posts</Text>
        <TouchableOpacity className='bg-blue-500 px-4 p-2 rounded-lg mt-3' onPress={()=>refetch()} >
          <Text className='text-white font-semibold'>Retry</Text>
        </TouchableOpacity>

      </View>

  }
  if(posts?.length === 0) {
    return  <View className='p-8 items-center'>
        <ActivityIndicator size={"large"} color={"#11DA1F2"} />
        <Text className='text-gray-500 mt-2'>No post yet !</Text>

      </View>

  }
  return (
    <>
     {
      posts.map((post:Post, index:number)=>(
        <PostCard
        key={index}
        post={post}
        onLike = {toggleLike}
        onDelete = {deletePost}
        currentUser= {currentUser}
        isLiked = {checkIsLiked(post.likes, currentUser)}

        
        />
      ))
     }
    </>
  )
}

export default PostList