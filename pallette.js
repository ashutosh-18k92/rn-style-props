import { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Pressable, Text } from "react-native";
import { colorComplement, colorDecSum, mapTextColorFor } from "./hex-utils";

const codes = "0123456789abcdef".split("");

const defaultColors = () => {
  const grid = [];
  codes.forEach((c1) => {
    codes.forEach((c2) => {
      let row = [];
      codes.forEach((c3) => {
        row.push("#" + [c1, c1, c2, c2, c3, c3].join(""));
      });
      grid.push(row);
    });
  });
  return grid;
};

const shades = (color) => {
  const grid = [];
  return grid;
};

function Palette() {
  const [shade, setShade] = useState(null);
  const [grid, setGrid] = useState(null);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    setGrid(defaultColors());
  }, []);

  useEffect(() => {
    if (shade) setGrid(shades(shade));
  }, [shade]);

  function renderCell(color) {
    /** Trying to map a foreground and map with optimum clarity.  */
    const textColor = mapTextColorFor(color);
    return (
      <Pressable
        key={color}
        style={[styles.palette, { backgroundColor: color }]}
        onPress={() => setSelected({ color, textColor })}
      >
        <Text style={[styles.text, { color: textColor }]}>@</Text>
      </Pressable>
    );
  }

  function renderRow(row, i) {
    return (
      <View key={i} style={{ flex: 1, flexDirection: "row", marginBottom: 1 }}>
        {row.map((color, j) => renderCell(color, i, j))}
      </View>
    );
  }

  function renderGrid() {
    return grid.map((row, i) => renderRow(row, i));
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {grid && grid.length > 0 ? renderGrid() : <Text>Grid is empty</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  palette: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 60,
    borderRadius: 5,
    margin: 2,
  },
  text: { fontWeight: "bold", fontSize: 18 },
});

export default Palette;
