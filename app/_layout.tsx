import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import '../global.css';
import { LocationProvider } from "./context/AppDataProvider";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LocationProvider>
      <Stack 
    screenOptions={{
      headerShown: false,
    }}
  />
      </LocationProvider>
    </SafeAreaProvider>
  )
}
