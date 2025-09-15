import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import CustomButton from "./CustomButton";

function ColorPicker({ label, data, currentIndex, onSelected, style, minimized, onMaximize }) {
  if (!data || !!!data.length) return;

  const onSelectHandler = (index) => {
    onSelected(index);
  };

  function renderItem({ item, index }) {
    const selected = index === currentIndex;
    return (
      <TouchableWithoutFeedback onPress={() => onSelectHandler(index)}>
        <View style={[styles.item, selected && styles.itemSelected, { borderColor: item }]}>
          <View
            style={[styles.color, { backgroundColor: item }, selected && styles.colorSelected]}
          ></View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  function renderMinimized() {
    const selected = true;
    const item = data[currentIndex];
    return (
      <TouchableWithoutFeedback onPress={onMaximize}>
        <View style={[styles.item, selected && styles.itemSelected, { borderColor: item }]}>
          <View
            style={[styles.color, { backgroundColor: item }, selected && styles.colorSelected]}
          ></View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <>
      {label && <Text style={styles.title}>{label}</Text>}

      <LinearGradient
        colors={["rgba(203, 205, 208, 0.45)", "rgba(203, 205, 208, 0.60)"]}
        style={Array.isArray(style) ? [styles.container, ...style] : [styles.container, style]}
      >
        {minimized ? (
          renderMinimized()
        ) : (
          <FlatList
            bounces
            horizontal
            data={data}
            keyExtractor={(item) => String(item)}
            renderItem={renderItem}
          />
        )}
        {!minimized && onMaximize && <CustomButton title="Hide" noShadow onPress={onMaximize}/>}
      </LinearGradient>
      
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 13,
    borderRadius: 30,

  },
  color: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  colorSelected: {
    height: 15,
    width: 15,
    borderRadius: 8,
  },

  item: {
    marginHorizontal:5,
    height: 30,
    width: 30,
    backgroundColor: "rgba(210, 210, 210, 0.1)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  itemSelected: {
    borderWidth: 5,
  },

  title: {
    fontWeight: "bold",
    marginVertical: 8,
  },
});
export default ColorPicker;
