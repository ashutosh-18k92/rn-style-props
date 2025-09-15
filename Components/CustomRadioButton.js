import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import IconButton from "./IconButton";

function RButton({ button, isChecked, onCheck }) {
  const onCheckHandler = () => {
    onCheck && onCheck(button.value);
  };
  const icon = isChecked ? "checkmark-circle" : "radio-button-off";
  const color = isChecked ? "darkgreen" : "lightgray";
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.label}>{button.label}</Text>
      <IconButton name={icon} color={color} onPress={onCheckHandler} />
    </View>
  );
}

export default function CustomRadioButton({ buttons, style, checkedValue, onCheck }) {
  const [checkedItem, setCheckedItem] = useState({
    value: checkedValue,
    isChecked: !!checkedValue,
  });

  useEffect(() => {
    if (checkedItem.isChecked) {
      onCheck && onCheck(checkedItem.value);
    } else {
      onCheck && onCheck(undefined);
    }
  }, [checkedItem]);

  const onCheckHandler = (value) => {
    setCheckedItem((prev) => (value === prev.value ? {} : { value, isChecked: true }));
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Saturation</Text>
      <View style={styles.content}>
        {buttons.map((button, i) => {
          const isChecked = button.value === checkedItem.value && checkedItem.isChecked;
          return <RButton key={i} button={button} isChecked={isChecked} onCheck={onCheckHandler} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 14,
    fontWeight: 700,
    fontFamily: "Roboto",
    position: "absolute",
    backgroundColor: "white",
    color: "dimgray",
    paddingHorizontal: 10,
    zIndex: 1,
    alignSelf: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingTop: 8,
    paddingBottom: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "lightgray",
    shadowColor: "black",
    shadowOffset: { width: -1, height: -1 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: 400,
    marginRight: 5,
    color: "dimgray",
  },
});
