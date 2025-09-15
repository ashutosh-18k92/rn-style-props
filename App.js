import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Palette from "./Palette";
import TextStyleProps from "./TextStyleProps";
import { useState } from "react";
import CustomToggle from "./Components/CustomToggle";
export default function App() {
  const tabs = [
    { label: "Style Text", value: "styletext" },
    { label: "Color Picker", value: "colorpicker" },
  ];

  const [activeTab, setActiveTab] = useState("colorpicker");
  const show = activeTab === "colorpicker";
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomToggle
          buttons={tabs}
          onToggle={(val) => {
            setActiveTab(val);
          }}
        />
        {show ? <Palette /> : <TextStyleProps />}
      </SafeAreaView>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
