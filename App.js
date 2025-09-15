import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Palette from "./Palette";
import TextStyleProps from "./TextStyleProps";
import { useState } from "react";
import CustomTabs from "./Components/CustomTabs";
import { View, Text } from "react-native";

export default function App() {
  const tabs = [
    { label: "Style Text", value: "styletext" },
    { label: "Color Picker", value: "colorpicker" },
    { label: "Design", value: "design" },
  ];

  const [activeTab, setActiveTab] = useState("colorpicker");

  const renderTab = () => {
    switch (activeTab) {
      case "styletext":
        return <TextStyleProps />;
      case "colorpicker":
        return <Palette />;
      case "design":
        return (
          <View>
            <Text>Design</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomTabs style={{}} tabs={tabs} onSelect={setActiveTab} activeTab="colorpicker" />
        {renderTab()}
      </SafeAreaView>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
