import {  Alert } from 'react-native';
import { useClerk } from '@clerk/clerk-expo';

export const useSignOut = () => {
  const { signOut } = useClerk();

  const handleSignOut = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out from your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => signOut(),
        },
      ],
      { cancelable: true }
    );
  };

  return { handleSignOut };
};
