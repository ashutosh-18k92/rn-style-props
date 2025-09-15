import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

export default function CustomTabs({ tabs, style, activeTab, onSelect }) {
  if (!Array.isArray(tabs)) return;

  const [activeTabValue, setActiveTabValue] = React.useState(activeTab || [tabs[0]?.value]);

  /**
   * toggle false represents right value
   */

  useEffect(() => {
    onSelect && onSelect(activeTabValue);
  }, [activeTabValue]);

  const renderButton = (tab, index) => {
    const isActive = activeTabValue === tab.value;
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => setActiveTabValue(tab.value)}
        disabled={isActive}
      >
        <View style={[styles.button, isActive && styles.buttonActive]}>
          <Text style={[styles.text, isActive && styles.active]}>{tab.label}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <View style={styles.buttonContainer}>{tabs.map(renderButton)}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "darkgray",
    borderRadius: 5,
  },
  button: {
    margin: 3,
  },

  buttonActive: {
    backgroundColor: "black",
    borderRadius: 4,
  },
  fader: {
    backgroundColor: "black",
    borderRadius: 4,
  },

  text: {
    margin: 7,
    fontSize: 16,
    fontWeight: 600,
    color: "gray",
  },
  active: {
    color: "white",
    fontWeight: 700,
  },
});
