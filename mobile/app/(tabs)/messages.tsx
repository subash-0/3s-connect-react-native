import { View, Text, Alert, TextInput, TouchableOpacity, ScrollView, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { CONVERSATIONS, ConversationType } from '@/data/conversation';
import { Feather } from '@expo/vector-icons';

const MessageScreen = () => {
  const insets =  useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");
  const [converationList ,setConversationList] = useState(CONVERSATIONS);
  const [selectConveration, setSelectConversation] = useState<ConversationType|null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [newMessage, setNewMessage] = useState("");

  const deleteConversations = (convId : number) =>{
    Alert.alert("Delete Conversation","Are you sure Want to delete?",
      [
        {text:"Cancel", style: "cancel"},
        {text:"Delete", style:"destructive",
          onPress:()=> {
            setConversationList((prev)=>prev.filter((conv)=>conv.id !== convId))
          }
        },
        

      ]
    )
  }

  const openConversation = (conversation: ConversationType)=>{
    setSelectConversation(conversation);
    setIsChatOpen(true)
  }

  const closeModal = ()=>{
    setIsChatOpen(false);
    setSelectConversation(null);
    setNewMessage("");
  }

  const sendMessage = () =>{
    if(newMessage.trim() && selectConveration){
      setConversationList((pre)=> pre.map((conv)=>
        conv.id === selectConveration.id ? {...conv, lastMessage : newMessage, time:"now"} : conv
      
      ));
      setNewMessage("");
      Alert.alert("Message Set", `Your Message has been sent to ${selectConveration.user.name}`)
    }
  }
  return (
    <SafeAreaView className='flex-1'>
      {/* HEADER  */}
      <View className='flex-row items-center justify-between px-4 py-3 border-b border-gray-300'>
        <Text className='text-xl font-bold text-gray-900'>Messages</Text>
        <Feather name='edit' size={24} color={"#1DA1FE"} />


      </View>

      {/* SEARCH BAR  */}

      <View className='flex-row border-b border-gray-100' >
        <View className='flex-row items-center bg-gray-100 rounded-full px-4 py-3'>
          <Feather name='search' size={20} color="#657786" />
          <TextInput
          placeholder='Search people and groups'
          className='flex ml-3 text-base'
          placeholderTextColor={"#657786"}
          value={searchText}
          onChangeText={setSearchText}
          
          />
          
        
        
        </View>


      </View>
        <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
      >
        {converationList.map((conversation) => (
          <TouchableOpacity
            key={conversation.id}
            className="flex-row items-center p-4 border-b border-gray-50 active:bg-gray-50"
            onPress={() => openConversation(conversation)}
            onLongPress={() => deleteConversations(conversation.id)}
          >
            <Image
              source={{ uri: conversation.user.avatar }}
              className="size-12 rounded-full mr-3"
            />

            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-1">
                <View className="flex-row items-center gap-1">
                  <Text className="font-semibold text-gray-900">{conversation.user.name}</Text>
                  {conversation.user.verified && (
                    <Feather name="check-circle" size={16} color="#1DA1F2" className="ml-1" />
                  )}
                  <Text className="text-gray-500 text-sm ml-1">@{conversation.user.username}</Text>
                </View>
                <Text className="text-gray-500 text-sm">{conversation.time}</Text>
              </View>
              <Text className="text-sm text-gray-500" numberOfLines={1}>
                {conversation.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quick Actions */}
      <View className="px-4 py-2 border-t border-gray-100 bg-gray-50">
        <Text className="text-xs text-gray-500 text-center">
          Tap to open • Long press to delete
        </Text>
      </View>

      <Modal visible={isChatOpen} animationType="slide" presentationStyle="pageSheet">
        {selectConveration && (
          <SafeAreaView className="flex-1">
            {/* Chat Header */}
            <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
              <TouchableOpacity onPress={closeModal} className="mr-3">
                <Feather name="arrow-left" size={24} color="#1DA1F2" />
              </TouchableOpacity>
              <Image
                source={{ uri: selectConveration.user.avatar }}
                className="size-10 rounded-full mr-3"
              />
              <View className="flex-1">
                <View className="flex-row items-center">
                  <Text className="font-semibold text-gray-900 mr-1">
                    {selectConveration.user.name}
                  </Text>
                  {selectConveration.user.verified && (
                    <Feather name="check-circle" size={16} color="#1DA1F2" />
                  )}
                </View>
                <Text className="text-gray-500 text-sm">@{selectConveration.user.username}</Text>
              </View>
            </View>

            {/* Chat Messages Area */}
            <ScrollView className="flex-1 px-4 py-4">
              <View className="mb-4">
                <Text className="text-center text-gray-400 text-sm mb-4">
                  This is the beginning of your conversation with {selectConveration.user.name}
                </Text>

                {/* Conversation Messages */}
                {selectConveration.messages.map((message) => (
                  <View
                    key={message.id}
                    className={`flex-row mb-3 ${message.fromUser ? "justify-end" : ""}`}
                  >
                    {!message.fromUser && (
                      <Image
                        source={{ uri: selectConveration.user.avatar }}
                        className="size-8 rounded-full mr-2"
                      />
                    )}
                    <View className={`flex-1 ${message.fromUser ? "items-end" : ""}`}>
                      <View
                        className={`rounded-2xl px-4 py-3 max-w-xs ${
                          message.fromUser ? "bg-blue-500" : "bg-gray-100"
                        }`}
                      >
                        <Text className={message.fromUser ? "text-white" : "text-gray-900"}>
                          {message.text}
                        </Text>
                      </View>
                      <Text className="text-xs text-gray-400 mt-1">{message.time}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* Message Input */}
            <View className="flex-row items-center px-4 py-3 border-t border-gray-100">
              <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-3 mr-3">
                <TextInput
                  className="flex-1 text-base"
                  placeholder="Start a message..."
                  placeholderTextColor="#657786"
                  value={newMessage}
                  onChangeText={setNewMessage}
                  multiline
                />
              </View>
              <TouchableOpacity
                onPress={sendMessage}
                className={`size-10 rounded-full items-center justify-center ${
                  newMessage.trim() ? "bg-blue-500" : "bg-gray-300"
                }`}
                disabled={!newMessage.trim()}
              >
                <Feather name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  )
}

export default MessageScreen