import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ColorPicker from "./ColorPicker";
import { mapTextColorAgainstBg, shades } from "./hex-utils";

function ColorPalette({ onSelected }) {
  const [palette, setPalette] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  //index in a row of the palette for the color picker
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedColorsHistory, setSelectedColorsHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);

  const setPaletteProfile = (color) => {
    const colors = shades(color);
    setPalette(colors);
    setSelectedColorsHistory((p) => {
      p.push(color);
      return [...p];
    });
    setCurrentHistoryIndex((p) => p + 1);
  };

  //init
  useEffect(() => {
    const colors = shades();
    setPalette(colors);
  }, []);

  const colorSelectHandler = (row, column) => {
    const color = palette[row][column];
    setSelectedColorIndex(column);
    console.log("selected", color);
    setSelectedColor(color);
    setModalVisible(true);
  };

  function renderGrid() {
    return palette.map((colors, i) => (
      <View key={i} style={{ margin: 10 }}>
        <ColorPicker
          data={colors}
          currentIndex={selectedColorIndex}
          onSelected={(pickerIndex) => colorSelectHandler(i, pickerIndex)}
        />
      </View>
    ));
  }

  function renderModal() {
    const textColor = mapTextColorAgainstBg(selectedColor);
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: selectedColor }]}>
            <Text style={[styles.modalText, { color: textColor }]}>
              {selectedColor} {textColor}
            </Text>
            <Pressable style={[styles.button]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
            <Pressable
              style={[styles.buttonMore]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setPaletteProfile(selectedColor);
              }}
            >
              <Text style={styles.textStyle}>more</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <Pressable
          style={[styles.navButton]}
          disabled={currentHistoryIndex === 0}
          onPress={() => setCurrentHistoryIndex((p) => p - 1)}
        >
          <Text style={styles.textStyle}>Prev</Text>
        </Pressable>
        <Pressable
          style={[styles.navButton]}
          disabled={currentHistoryIndex === selectedColorsHistory.length - 1}
          onPress={() => setCurrentHistoryIndex((p) => p + 1)}
        >
          <Text style={styles.textStyle}>Next</Text>
        </Pressable>
      </View>
      {renderModal()}
      <View style={{ flex: 1, alignItems: "center" }}>
        <ScrollView>
          <View style={styles.paletteContainer}>
            {palette && palette.length > 0 ? renderGrid() : <Text>Grid is empty</Text>}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  navigation: {
    flexDirection: "row",
    height: 40,
    width: 300,
    alignItems: "center",
    justifyContent: "space-between",
  },
  paletteContainer: { flex: 1, marginVertical: 20 },
  palette: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 60,
    borderRadius: 5,
    margin: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(60, 51, 51, 0.65)",
  },

  modalView: {
    margin: 20,
    height: 400,
    width: 600,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 72,
    fontWeight: 900,
    marginBottom: 15,
    textAlign: "center",
    // textShadowColor: "white",
    // textShadowRadius: 1,
    // textShadowOffset:{width:0,height:0}
  },
  navButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "white",
  },

  button: {
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "white",
  },
  buttonMore: {
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "white",
  },

  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ColorPalette;
