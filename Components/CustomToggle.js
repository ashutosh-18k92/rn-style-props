import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React, { useEffect } from "react";

export default function CustomToggle({ buttons, style, onToggle }) {
  if (buttons.length !== 2) return null;

  const [leftTitle, rightTitle] = buttons.map((k) => k.label);
  const [leftValue, rightValue] = buttons.map((k) => k.value);
  const [toggle, setToggle] = React.useState(true);
  const [activeValue, setActiveValue] = React.useState(leftValue);

  /**
   * toggle false represents right value
   */

  useEffect(() => {
    onToggle && onToggle(activeValue);
  }, [activeValue]);

  const toggleLeft = (value) => {
    setToggle(true);
    setActiveValue(leftValue);
  };

  const toggleRight = (value) => {
    setToggle(false);
    setActiveValue(rightValue);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <TouchableWithoutFeedback onPress={toggleLeft} disabled={activeValue === leftValue}>
            <View style={[styles.buttonLeft, toggle && styles.buttonActive]}>
              <Text style={[styles.text, toggle && styles.active]}>{leftTitle}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={toggleRight} disabled={activeValue === rightValue}>
            <View style={[styles.buttonRight, !toggle && styles.buttonActive]}>
              <Text style={[styles.text, !toggle && styles.active]}>{rightTitle}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  content: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  buttonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "darkgray",
    borderRadius: 5,
  },
  buttonLeft: {
    margin: 3,
  },
  buttonRight: {
    margin: 3,
  },

  buttonActive: {
    backgroundColor: "black",
    borderRadius: 4,
  },

  text: {
    margin: 10,
    fontSize: 18,
    fontWeight: 600,
    color: "gray",
  },
  active: {
    color: "white",
    fontWeight: 700,
  },
});
