import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Palette from "./Palette";
export default function App() {
  return (
    <SafeAreaProvider>
      {/* <TextStyleProps /> */}
      <Palette />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

