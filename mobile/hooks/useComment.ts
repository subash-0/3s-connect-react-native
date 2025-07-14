import { commentApi, useApiClient } from "@/utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import { Alert } from "react-native";

export const useComment = () =>{

  const [commentText, setCommentText] = useState("");
  const api = useApiClient();
  const queryClient = useQueryClient();


  const commentMutation = useMutation({
    mutationFn:async({postId, content}:{postId:string, content:string})=>{
    const response =   await commentApi.createComment(api,postId,content);
    return response.data;
    },
    onError:()=>{Alert.alert("Error","Something Went Wrong !")},
    onSuccess:()=>{
      setCommentText("");
      queryClient.invalidateQueries({queryKey:["posts"]})
    }
  })

  const createComment =(postId:string)=>{
    if(!commentText.trim()){
      Alert.alert("Empty Comment", "Please Write Something")
    }
    commentMutation.mutate({postId,content:commentText});
  }

  return {
    commentText,
    setCommentText,
    createComment,
    isCreatingComment : commentMutation.isPending
  }
}