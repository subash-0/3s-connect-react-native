import { useApiClient, userApi } from "@/utils/api";
import { useAuth } from "@clerk/clerk-expo";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";




export const userUserSync = () => {
  const {isSignedIn} = useAuth();
  const api = useApiClient()

  const syncUserMutation = useMutation({
        mutationFn: ()=> userApi.syncUser(api),
        onError:(error)=> console.log("User sync failed", error)
  });

  // auto sync-user when signed in

  useEffect(()=>{
    if(isSignedIn && !syncUserMutation.data){
      syncUserMutation.mutate()
    }

  },[isSignedIn])

  return null;

}

