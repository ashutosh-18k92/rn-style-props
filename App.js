import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Palette from "./pallette";
export default function App() {
  return (
    <SafeAreaProvider>
      {/* <TextStyleProps /> */}
      <Palette />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

