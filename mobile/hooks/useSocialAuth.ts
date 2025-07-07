import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react"
import { Alert } from "react-native";


export const useSocialAuth = () =>{
  const [isLoading, setIsLoading] = useState(false);
  const {startSSOFlow} = useSSO();

  const handleSocialAuth = async(strategy : "oauth_google" | "oauth_github") =>{
    setIsLoading(true);
    try {
      const {createdSessionId, setActive} = await startSSOFlow({strategy});

        if(createdSessionId && setActive){
          await setActive({session: createdSessionId})
        }
      
    } catch (error) {
      console.log(error)
      const provider = strategy === "oauth_github" ? "Github" : "Google"
      Alert.alert("Error", `Failed to sign in with ${provider}. Please try again later !`)
      
    }finally{
      setIsLoading(false)
    }
  }






  return {isLoading, handleSocialAuth}
}