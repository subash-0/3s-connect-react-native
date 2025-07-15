import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SingOutButton from "@/components/SingOutButton";
import { Feather } from "@expo/vector-icons";
import { formatDate } from "@/utils/formatter";
import { format } from "date-fns";
import { usePosts } from "@/hooks/usePost";
import PostList from "@/components/PostList";

const ProfileScreen = () => {
  const { isLoading, currentUser } = useCurrentUser();
const {isLoading:loadingPosts,refetch, posts:userPosts}= usePosts(currentUser.username);
  const insets = useSafeAreaInsets();
  
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} color={"#1DA1F2"} />
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* HEADER  */}
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
        <View>
          <Text className="text-xl font-bold text-gray-900">
            {currentUser.firstName} {currentUser.lastName}
          </Text>
          <Text className="text-sm text-gray-500">{userPosts?.length || 0} posts</Text>
        </View>
        <SingOutButton />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loadingPosts} onRefresh={refetch}/>
        }
      >
        <Image
          source={
            currentUser?.bannerImage
              ? { uri: currentUser.bannerImage }
              : require("../../assets/images/logo.png")
          }
          className="w-full h-48 bg-blue-900"
          resizeMode="cover"
        />
        <View className="px-4 pb-4 border-b border-gray-200">
          <View className="flex-row justify-between items-end -mt-16 mb-4">
            <Image
              source={{ uri: currentUser.profilePicture }}
              className="size-32 rounded-full border-4 border-white"
            />
            <TouchableOpacity className="border border-gray-300 px-6 py-2 rounded-full">
              <Text className="font-semibold text-gray-900">Edit Profile</Text>
            </TouchableOpacity>
          </View>
          <View className="mb-4">
            <View className="flex-row items-center mb-1">
              <Text className="text-xl font-bold text-gray-900 mr-1">
                {currentUser.firstName} {currentUser.lastName}
              </Text>

            </View>
            <Text className="text-gray-500 mb-2">@{currentUser.username}</Text>
            <Text className="text-gray-500 mb-2">{currentUser.bio}</Text>
            <View className="flex-row items-center mb-3">
              <Feather name="map-pin" size={16} color={"#675586"} />
              <Text className="text-gray-500 ml-2"> {currentUser?.location} </Text>

            </View>
            <View className="flex-row items-center mb-3">
              <Feather name="calendar" size={16} color={"#675586"} />
              <Text className="text-gray-500 ml-2"> {format( new Date(currentUser?.createdAt),"dd-MMMM,yyyy")} </Text>

            </View>
            <View className="flex-row">
              <TouchableOpacity className="mr-6">
                <Text className="text-gray-900">
                  <Text className="font-bold">{currentUser.following?.length}</Text>
                  <Text className="text-gray-500"> Following</Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="text-gray-900">
                  <Text className="font-bold">{currentUser.followers?.length}</Text>
                  <Text className="text-gray-500"> Followers</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <PostList username={currentUser?.username} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
