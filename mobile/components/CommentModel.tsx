import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Post } from "@/types";
import { useComment } from "@/hooks/useComment";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Feather } from "@expo/vector-icons";
import { formatDate } from "@/utils/formatter";

interface CommentModelProps {
  selectedPost: Post;
  onClose: () => void;
}
const CommentModel = ({ selectedPost, onClose }: CommentModelProps) => {
  const { commentText, setCommentText, createComment, isCreatingComment } =
    useComment();

  const { currentUser } = useCurrentUser();
  const handleClose = () => {
    onClose();
    setCommentText("");
  };

  return (
    <Modal
      visible={!!selectedPost}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-400">
        <TouchableOpacity onPress={handleClose}>
          <Feather name="x" size={24} color={"red"} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold">Commnets</Text>
        <View className="w-12" />
      </View>
      <ScrollView className="flex-1">
        <View className="border-b border-gray-200 bg-white p-4">
          <View className="flex-row">
            <Image
              source={{ uri: selectedPost?.user.profilePicture }}
              className="size-12 rounded-full mr-2"
            />
            <View className="flex-1">
              <View className="flex-row items-center mb-1">
                <Text className="text-lg font-semibold">
                  {selectedPost?.user.firstName} {selectedPost?.user.lastName}
                </Text>
                <Text className="text-sm text-gray-500 ml-2">
                  {" "}
                  @{selectedPost?.user.username}
                </Text>
                <Text> .{formatDate(selectedPost?.createdAt)} </Text>
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 font-medium">
                  {" "}
                  {selectedPost?.content}{" "}
                </Text>
                <Image
                  source={{ uri: selectedPost?.image }}
                  className="w-full h-48 rounded-2xl mt-2"
                />
              </View>
            </View>
          </View>
        </View>

        {selectedPost?.comments.map((comment) => (
          <View
            className="border-b border-gray-200 bg-white p-4"
            key={comment._id}
          >
            <View className="flex-row">
              <Image
                source={{ uri: comment?.user?.profilePicture }}
                className="size-10 rounded-full mr-3"
              />
               <View className="flex-row items-center mb-1">
              <Text className="text-lg font-semibold">
                {comment?.user.firstName} {comment.user.lastName}
              </Text>
              <Text className="text-sm text-gray-500 ml-2">
                {" "}
                @{comment?.user.username}
              </Text>
              <Text> .{formatDate(comment?.createdAt)} </Text>
            </View>
            
            </View>
            <View className="ml-6 text-lg font-bold">
               <Text className="text-gray-500 ml-4 font-semibold"> {comment?.content || "hello"} </Text>
            </View>
           
          </View>
        ))}

         {/* ADD COMMENT  */}

          <View className="p-4 border-t border-gray-200">
            <View className="flex-row">
              <Image 
              source={{uri:currentUser?.profilePicture}}
              className="size-10 rounded-full mr-3"
              />
              <View className="flex-1">
                <TextInput
                className="border border-gray-200 rounded-lg p-3 text-base mb-3"
                placeholder="Write a comment... "
                value={commentText}
                onChangeText={setCommentText}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                />

                
                <TouchableOpacity
                className={`px-4 py-2 rounded-lg self-start
                  ${commentText.trim()? "bg-blue-500":"bg-gray-300"}
                  `}

                  onPress={()=>createComment(selectedPost._id)}
                  disabled={isCreatingComment || !commentText.trim()}

                >
                  {isCreatingComment ? (
                    <ActivityIndicator size={"small"} color={"white"}  />
                  ):(
                    <Text className={`px-4 py-2 rounded-lg self-start
                  ${commentText.trim()? "text-white":"text-gray-500"}
                  `}>
                    Reply
                  </Text>
                  )}
                </TouchableOpacity>
              

              </View>

            </View>


          </View>

         
      </ScrollView>
    </Modal>
  );
};

export default CommentModel;
