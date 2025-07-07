import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useSocialAuth } from "@/hooks/useSocialAuth";

export default function Index() {
  
  const {isLoading, handleSocialAuth} = useSocialAuth();
  return (
    <View className="flex-1  bg-white">
      <View className="flex-1 px-8 justify-between">
        <View className="flex-1 justify-center">
          {/* demo image */}
          <View className="items-center">
            <View
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -10 }, // -10 height means shadow moves *up* from the bottom
                shadowOpacity: 0.3,
                shadowRadius: 10,
                elevation: 5, // for Android
              }}
            >
              <Image
                source={require("../../assets/images/banner.png")}
                className="size-96"
                resizeMode="contain"
              />
            </View>
          </View>

          {/* buttons  */}

          <View className="flex-col gap-2">
            <TouchableOpacity
              className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full mt-2 py-3 px-6"
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={isLoading}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 2,
                shadowOpacity: 0.4,
                elevation: 2,
              }}
            >
              {
                isLoading ?   <ActivityIndicator size={"small"} color={"#000"} className="py-3" /> :
              
              <View className="flex-row items-center justify-center">
                <Image
                  source={require("../../assets/images/google.png")}
                  className="size-10 mr-3"
                  resizeMode="contain"
                />
                <Text className="text-black font-medium text-base">
                  Continue with Google
                </Text>
              </View>
}
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full mt-2 py-3 px-6"
              onPress={() =>handleSocialAuth("oauth_github")}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowRadius: 2,
                shadowOpacity: 0.4,
                elevation: 2,
              }}
            >
              {
                isLoading ?   <ActivityIndicator size={"small"} color={"#000"} className="py-3" /> :
              
              <View className="flex-row items-center justify-center">
                <Image
                  source={require("../../assets/images/github.png")}
                  className="size-10 mr-3"
                  resizeMode="contain"
                />
                <Text className="text-black font-medium text-base">
                  Continue with Github
                </Text>
               
              </View>
}
            </TouchableOpacity>
          </View>
          <Text className="text-center text-gray-500 text-xs leading-4 mt-6 px-2">
            By signing up, you agree to our 
            <Text className="text-blue-500"> Terms</Text> {", "}
              <Text className="text-blue-500">Privacy Policies</Text> {", and "}
            <Text className="text-blue-500">Cookie use</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
