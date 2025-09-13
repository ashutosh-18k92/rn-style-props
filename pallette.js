import { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ColorPicker from "./ColorPicker";
import CustomButton from "./CustomButton";
import IconButton from "./IconButton";
import {
  getOptimalTextColor,
  getShadesOfBgColor,
  getShadesOfTextColor,
  Saturation,
} from "./hex-utils";

function ColorPalette({ onSelected }) {
  const [palette, setPalette] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedTextColor, setSelectedTextColor] = useState(null);
  //index in a row of the palette for the color picker
  const [selectedColorGridIndex, setSelectedColorGridIndex] = useState({ row: -1, column: -1 });
  const [selectedTextColorIndex, setSelectedTextColorIndex] = useState(null);
  const [textColorShades, setTextColorShades] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedColorsHistory, setSelectedColorsHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [colorsCart, setColorsCart] = useState([]);
  const [cartForm, setCartForm] = useState({ name: "", backgroundColor: "", color: "" });
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [saturation, setSaturation] = useState(Saturation.LOW);

  const setPaletteProfileOnExplore = (color, sat) => {
    const colors = getShadesOfBgColor(color);
    setPalette(colors);
    setSelectedColorsHistory((p) => {
      p.push(color);
      return [...p];
    });
    setCurrentHistoryIndex((p) => p + 1);
  };

  const setPaletteProfileJump = (index) => {
    let color = selectedColorsHistory[index];
    const palette = getShadesOfBgColor(color);
    setPalette(palette);
    setCurrentHistoryIndex(index);
  };

  const setPaletteProfileNext = () => {
    let color = selectedColorsHistory[currentHistoryIndex + 1];
    const palette = getShadesOfBgColor(color);
    setPalette(palette);
    setCurrentHistoryIndex((p) => p + 1);
  };

  const setPaletteProfilePrevious = () => {
    let color = selectedColorsHistory[currentHistoryIndex - 1];
    const palette = getShadesOfBgColor(color);
    setPalette(palette);
    setCurrentHistoryIndex((p) => p - 1);
  };

  //init
  useEffect(() => {
    const colors = getShadesOfBgColor();
    setPalette(colors);
  }, []);

  useEffect(() => {
    const colors = getShadesOfBgColor(selectedColor, saturation);
    setPalette(colors);
  }, [saturation]);

  function renderGrid() {
    const colorSelectHandler = (row, column) => {
      const color = palette[row][column];
      const textColor = getOptimalTextColor(color);
      const textColorShades = getShadesOfTextColor(textColor);
      setSelectedColorGridIndex({ row, column });
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
          currentIndex={
            i === selectedColorGridIndex.row ? selectedColorGridIndex.column : undefined
          }
          onSelected={(pickerIndex) => colorSelectHandler(i, pickerIndex)}
        />
      </View>
    ));
  }

  function renderFormModal() {
    const addToCartHandler = () => {
      setColorsCart((p) => {
        let q = [...p];
        q.push(cartForm);
        return q;
      });
      setCartForm({ name: "", backgroundColor: "", color: "" });
      setFormModalVisible(false);
    };

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
              <CustomButton title="Add" style={styles.buttonCart} onPress={addToCartHandler} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  function renderPreview() {
    const showContent = selectedColor && selectedTextColor;
    const bgStyle = { backgroundColor: selectedColor };
    const textStyle = { color: selectedTextColor };

    return (
      <View
        style={[
          styles.previewContent,
          bgStyle,
          styles.shadow,
          !showContent && styles.modalViewEmpty,
        ]}
      >
        <Text
          style={[styles.previewText, { backgroundColor: selectedTextColor, color: selectedColor }]}
        >
          {!showContent ? "Preview" : "Background " + selectedColor}
        </Text>
        {showContent && (
          <>
            <Text style={[styles.previewText, textStyle]}>Text {selectedTextColor}</Text>
            <ColorPicker
              data={textColorShades}
              currentIndex={selectedTextColorIndex}
              onSelected={(index) => {
                setSelectedTextColorIndex(index);
                setSelectedTextColor(textColorShades[index]);
                setCartForm((f) => ({ ...f, color: textColorShades[index] }));
              }}
            />
          </>
        )}
      </View>
    );
  }

  function renderCart() {
    if (!!!colorsCart.length) return <Text>Your Cart is empty!</Text>;
    return colorsCart.map((c, i) => (
      <View
        key={i}
        style={[styles.cartItem, { backgroundColor: c.backgroundColor }, styles.shadow]}
      >
        <Text style={[styles.cartItemTitleText, { color: c.color }]}>{c.name}</Text>
        <Text style={[styles.cartItemBodyText, { color: c.color }]}>
          Background: {c.backgroundColor}{" "}
          <Text style={{ marginHorizontal: 15, fontWeight: 700 }}>/</Text> Text: {c.color}
        </Text>
      </View>
    ));
  }

  function renderNavigationButtons() {
    const nextDisabled = currentHistoryIndex === selectedColorsHistory.length - 1;
    const prevDisabled = currentHistoryIndex === -1;
    return (
      <>
        <IconButton
          name="arrow-back"
          color="#423e3e"
          style={[styles.navButton, { left: 10 }]}
          disabled={prevDisabled}
          onPress={setPaletteProfilePrevious}
        />
        <IconButton
          name="arrow-forward"
          color="#423e3e"
          style={[styles.navButton, { right: 10 }]}
          disabled={nextDisabled}
          onPress={setPaletteProfileNext}
        />
        <View style={styles.navContainer}>
          <View style={styles.navPagingContainer}>
            {selectedColorsHistory.map((color, i) => {
              const selected = currentHistoryIndex === i;
              return (
                <TouchableWithoutFeedback
                  onPress={() => setPaletteProfileJump(i)}
                  style={[styles.navPage, selected && styles.navPageSelected]}
                >
                  <View
                    style={[styles.navPageIcon, styles.shadow, { backgroundColor: color }]}
                  ></View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </View>
      </>
    );
  }

  function renderPalette() {
    return (
      <>
        {renderNavigationButtons()}
        <Text>Saturation: {saturation}</Text>
        <View style={styles.depthContainer}>
          <CustomButton
            title="Reset"
            style={styles.capsule}
            onPress={() => {
              setSelectedColor(null);
              setSelectedTextColor(null);
              setSelectedColorGridIndex({});
              setTextColorShades([]);
            }}
          />
          <CustomButton
            title="Low"
            style={styles.capsule}
            onPress={() => setSaturation(Saturation.LOW)}
          />
          <CustomButton
            title="Medium"
            style={styles.capsule}
            onPress={() => setSaturation(Saturation.MEDIUM)}
          />
          <CustomButton
            title="High"
            style={styles.capsule}
            onPress={() => setSaturation(Saturation.HIGH)}
          />
        </View>

        <ScrollView style={styles.paletteScroll}>
          {palette && palette.length > 0 ? renderGrid() : <Text>Palette is empty</Text>}
        </ScrollView>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderFormModal()}
        <View style={{ flex: 3, flexDirection: "row" }}>
          <View style={[styles.previewContainer, styles.shadow]}>{renderPreview()}</View>
          <View style={styles.paletteContainer}>{renderPalette()}</View>
        </View>

        <View style={styles.cartContainer}>
          <ScrollView style={styles.cartScroll}>{renderCart()}</ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#918f8f30",
  },

  depthContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 15,
  },

  capsule: {
    borderRadius: 30,
  },

  content: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  paletteRowContainer: { margin: 10, borderRadius: 50 },
  paletteScroll: { paddingHorizontal: 10, margin: 15 },

  cartScroll: { flex: 1, paddingVertical: 15 },

  cartContainer: {
    flex: 1,
    marginHorizontal: 10,
    padding: 25,
  },
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  navPagingContainer: {
    flexDirection: "row",
    marginVertical: 5,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  navPage: {
    marginRight: 8,
    alignItems: "center",
    alignContent: "center",
  },
  navButton: {
    position: "absolute",
    top: "50%",
    height: 40,
    width: 40,
    backgroundColor: "#a49e9e6e",

    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  navPageSelected: {
    borderWidth: 2,
    borderColor: "#6e6868ff",
    backgroundColor: "transparent",
    borderRadius: 4,
  },

  navPageIcon: {
    height: 20,
    width: 20,
    margin: 3,
    borderRadius: 4,
  },

  paletteContainer: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 35,
    padding: 40,
  },
  palette: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 60,
    borderRadius: 5,
    margin: 2,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(60, 51, 51, 0.65)",
  },

  previewContainer: {
    flex: 1,
    margin: 20,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  previewContent: {
    height: "100%",
    width: "100%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 35,
    padding: 35,
    alignItems: "center",
  },

  modalView: {
    margin: 20,
    minHeight: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },

  modalViewEmpty: {
    justifyContent: "center",
  },

  modalText: {
    fontSize: 48,
    fontWeight: 900,
    marginBottom: 15,
    textAlign: "center",
  },

  previewText: {
    fontSize: 48,
    fontWeight: 900,
    marginBottom: 15,
    textAlign: "center",
    padding: 10,
    borderRadius: 25,
  },

  buttonModal: {
    borderWidth: 2,
    borderColor: "white",
  },

  buttonClose: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "red",
  },

  cartItem: {
    height: 90,
    margin: 10,
    padding: 15,
    borderRadius: 5,
  },

  cartItemTitleText: {
    margin: 5,
    padding: 5,
    textAlign: "left",
    fontSize: 24,
  },

  cartItemBodyText: {
    fontSize: 18,
    fontWeight: 300,
  },

  cartForm: {},
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
