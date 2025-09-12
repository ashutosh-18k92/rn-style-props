import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View, TextInput } from "react-native";
import ColorPicker from "./ColorPicker";
import { bestTextColorOnBackground, getShadesOf, expandTextColorRange } from "./hex-utils";

function ColorPalette({ onSelected }) {
  const [palette, setPalette] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedTextColor, setSelectedTextColor] = useState(null);
  //index in a row of the palette for the color picker
  const [selectedColorIndex, setSelectedColorIndex] = useState({ row: -1, column: -1 });
  const [selectedTextColorIndex, setSelectedTextColorIndex] = useState(null);
  const [textColorShades, setTextColorShades] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedColorsHistory, setSelectedColorsHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [colorsCart, setColorsCart] = useState([]);
  const [cartForm, setCartForm] = useState({ name: "", backgroundColor: "", color: "" });
  const [formModalVisible, setFormModalVisible] = useState(false);

  const setPaletteProfileOnExplore = (color) => {
    const colors = getShadesOf(color);
    setPalette(colors);
    setSelectedColorsHistory((p) => {
      p.push(color);
      return [...p];
    });
    setCurrentHistoryIndex((p) => p + 1);
  };

  const setPaletteProfileJump = (index) => {
    let color = selectedColorsHistory[index];
    const palette = getShadesOf(color);
    setPalette(palette);
    setCurrentHistoryIndex(index);
  };

  const setPaletteProfileNext = () => {
    let color = selectedColorsHistory[currentHistoryIndex + 1];
    const palette = getShadesOf(color);
    setPalette(palette);
    setCurrentHistoryIndex((p) => p + 1);
  };

  const setPaletteProfilePrevious = () => {
    let color = selectedColorsHistory[currentHistoryIndex - 1];
    const palette = getShadesOf(color);
    setPalette(palette);
    setCurrentHistoryIndex((p) => p - 1);
  };

  //init
  useEffect(() => {
    const colors = getShadesOf();
    setPalette(colors);
  }, []);

  function renderGrid() {
    const colorSelectHandler = (row, column) => {
      const color = palette[row][column];
      const textColor = bestTextColorOnBackground(color);
      const textColorShades = expandTextColorRange(textColor);
      setSelectedColorIndex({ row, column });
      setSelectedColor(color);
      setSelectedTextColor(textColor);
      setTextColorShades(textColorShades);
      setModalVisible(true);
      setCartForm((f) => ({ ...f, backgroundColor: color, color: textColor }));
    };

    return palette.map((colors, i) => (
      <View key={i} style={[styles.paletteRowContainer, styles.shadow]}>
        <ColorPicker
          data={colors}
          currentIndex={i === selectedColorIndex.row ? selectedColorIndex.column : undefined}
          onSelected={(pickerIndex) => colorSelectHandler(i, pickerIndex)}
        />
      </View>
    ));
  }

  function renderFormModal() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={formModalVisible}
        onRequestClose={() => {
          setFormModalVisible(!formModalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.centeredView}>
            <View style={styles.cartForm}>
              <TextInput
                style={styles.colorNameInput}
                placeholder="Give it a name..."
                value={cartForm.name}
                onChangeText={(name) => setCartForm((q) => ({ ...q, name }))}
              />
              <Pressable
                style={[styles.button, styles.buttonCart]}
                onPress={() => {
                  setColorsCart((p) => {
                    let q = [...p];
                    q.push(cartForm);
                    return q;
                  });
                  setCartForm({ name: "", backgroundColor: "", color: "" });
                  setFormModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Continue</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  function renderModal() {
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
            <Text
              style={[
                styles.modalBgText,
                { backgroundColor: selectedTextColor, color: selectedColor },
              ]}
            >
              Background: {selectedColor}
            </Text>
            <Text style={[styles.modalText, { color: selectedTextColor }]}>
              Text Color: {selectedTextColor}
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>

            <ColorPicker
              data={textColorShades}
              currentIndex={selectedTextColorIndex}
              onSelected={(index) => {
                setSelectedTextColorIndex(index);
                setSelectedTextColor(textColorShades[index]);
                setCartForm((f) => ({ ...f, color: textColorShades[index] }));
              }}
            />

            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.button, styles.buttonExplore]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setPaletteProfileOnExplore(selectedColor);
                }}
              >
                <Text style={styles.textStyle}>Explore Shades</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonCart]}
                onPress={() => {
                  setModalVisible(false);
                  setFormModalVisible(true);
                }}
              >
                <Text style={styles.textStyle}>Add to Cart</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  function renderCart() {
    if (!!!colorsCart.length) return <Text>Your Cart is empty!</Text>;
    return colorsCart.map((c, i) => (
      <View style={[styles.cartItem, { backgroundColor: c.backgroundColor }, styles.shadow]}>
        <Text style={[styles.cartItemName, { color: c.color, textAlign: "left", fontSize: 24 }]}>
          {c.name}
        </Text>
        <Text key={i} style={[{ color: c.color, fontSize: 18, fontWeight: 300 }]}>
          Background: {c.backgroundColor}{" "}
          <Text style={{ marginHorizontal: 15, fontWeight: 700 }}>/</Text> Text: {c.color}
        </Text>
      </View>
    ));
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.navContainer}>
          <Pressable
            style={[styles.button, styles.navButton]}
            disabled={currentHistoryIndex === -1}
            onPress={setPaletteProfilePrevious}
          >
            <Text style={styles.navButtonText}>{"<< Prev"}</Text>
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              paddingVertical: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedColorsHistory.map((color, i) => {
              const selected = currentHistoryIndex === i;
              return (
                <Pressable
                  onPress={() => setPaletteProfileJump(i)}
                  style={[
                    { marginRight: 8, alignItems: "center", alignContent: "center" },

                    selected && {
                      borderWidth: 2,
                      borderColor: "#6e6868ff",
                      backgroundColor: "transparent",
                      borderRadius: 4,
                    },
                  ]}
                >
                  <View
                    style={[
                      {
                        height: 20,
                        width: 20,
                        margin: 3,
                        borderRadius: 4,
                        backgroundColor: color,
                      },
                      styles.shadow,
                    ]}
                  ></View>
                </Pressable>
              );
            })}
          </View>

          <Pressable
            style={[styles.button, styles.navButton]}
            disabled={currentHistoryIndex === selectedColorsHistory.length - 1}
            onPress={setPaletteProfileNext}
          >
            <Text style={styles.navButtonText}>{"Next >>"}</Text>
          </Pressable>
        </View>
        {renderModal()}
        {renderFormModal()}
        <View style={styles.paletteContainer}>
          {palette && palette.length > 0 ? renderGrid() : <Text>Palette is empty</Text>}
        </View>
        <View style={styles.cartContainer}>
          <ScrollView style={styles.scrollViewContainer}>{renderCart()}</ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#918f8f30",
  },
  content: { flex: 1, paddingVertical: 40, paddingHorizontal: 20 },
  paletteRowContainer: { margin: 10, borderRadius: 50 },
  scrollViewContainer: { paddingVertical: 15 },
  cartContainer: { flex: 1, marginHorizontal: 10, padding: 25 },
  navContainer: {
    flexDirection: "row",
    height: 40,
    width: "100%",
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
    minHeight: 400,
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
    fontSize: 48,
    fontWeight: 900,
    marginBottom: 15,
    textAlign: "center",
  },
  modalBgText: {
    fontSize: 48,
    fontWeight: 700,
    marginBottom: 15,
    textAlign: "center",
    padding: 10,
    borderRadius: 15,
  },
  navButton: {
    backgroundColor: "#0000aa",
  },
  navButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  modalButtonContainer: {
    width: "100%",
    // position: "absolute",
    // bottom: 10,
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 5 },
  },
  buttonExplore: {
    backgroundColor: "steelblue",
    borderWidth: 2,
    borderColor: "white",
  },
  buttonCart: {
    backgroundColor: "steelblue",
    borderWidth: 2,
    borderColor: "white",
  },
  buttonClose: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "red",
    borderWidth: 2,
    borderColor: "white",
  },

  cartItem: {
    height: 90,
    margin: 10,
    padding: 15,
    borderRadius: 5,
  },

  cartItemName: {
    margin: 5,
    padding: 5,
    textAlign: "center",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  cartForm: {
    //  width:'100%'
  },
  colorNameInput: {
    height: 40,
    width: 150,
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ColorPalette;
