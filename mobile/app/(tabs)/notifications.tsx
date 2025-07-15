import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import React from "react";
import { useNotification } from "@/hooks/useNotification";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import NoNotificationFound from "@/components/NoNotificationFound";
import NotificationCard from "@/components/NotificationCard";
import { Notification } from "@/types";

const NotificationsScreen = () => {
  const {
    notifications,
    isLoading,
    error,
    refetch,
    isRefetching,
    deleteNotification,
    isDeleting,
  } = useNotification();
  const insets = useSafeAreaInsets();
 
  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <Text className="text-gray-500 mb-4">Failed to Load Notifications</Text>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-lg"
          onPress={() => refetch}
        >
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-white " edges={["top"]}>
      {/* HEADER  */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <Text className="text-xl font-bold text-gray-900">Notifications</Text>
        <TouchableOpacity className="">
          <Feather name="settings" size={24} color={"#657786"} />
        </TouchableOpacity>
      </View>

      <ScrollView
      className="flex-1"
      contentContainerStyle={{paddingBottom:100+insets.bottom}}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={"#1DA1F2"} />
      }
      >
        {
          isLoading ? (
            <View className="flex-1 items-center justify-center p-8">
              <ActivityIndicator size={"large"} color={"#1DA1F2"} />
              <Text className="text-gray-500 mt-4">Loading notifications</Text>

            </View>
          ) : notifications?.length=== 0 ? (
            <NoNotificationFound />
          ) :(
            notifications?.map((notification:Notification)=>(
              <NotificationCard
              key={notification._id}
              notification={notification}
              onDelete={deleteNotification}
              />

            ))
          )
        }

      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
