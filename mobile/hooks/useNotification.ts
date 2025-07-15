import { notifiacationApi, useApiClient } from "@/utils/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";



export const useNotification = () =>{
  const api = useApiClient();
  const queryClient = useQueryClient();

  const {
    data:notificationData,
    isLoading,
    refetch,
    isRefetching,
    error
  } = useQuery({
    queryKey:["notifications"],
    queryFn:()=>notifiacationApi.getNotification(api),
    select:(res)=>res.data?.notifications,


  })


  const deleteNotificationMutation = useMutation({
    mutationFn:(notificationId:string)=>notifiacationApi.deleteNotification(api,notificationId),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["notifications"]})
      Alert.alert("Notification","Notification Deleted !")
    }
  })

  const deleteNotification = (notificationId:string)=>{
    deleteNotificationMutation.mutate(notificationId);
  }

  return {
     notifications: notificationData || [],
    isLoading,
    error,
    refetch,
    isRefetching,
    deleteNotification,
    isDeleting: deleteNotificationMutation.isPending,
  }
}