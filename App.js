import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TextStyleProps from "./TextStyleProps";
import Palette from "./pallette";
export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      {/* <TextStyleProps /> */}
      <Palette />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
