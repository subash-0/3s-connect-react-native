
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession(); // 👈 necessary for Clerk to complete login

export default function SSOCallback() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to tabs/home or wherever you want after SSO completes
    router.replace('/(tabs)/');
  }, []);

  return null; // or show a loading spinner if desired
}
