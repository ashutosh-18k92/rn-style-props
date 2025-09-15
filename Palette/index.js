import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import ColorPicker from "../Components/ColorPicker";
import CustomButton from "../Components/CustomButton";
import CustomRadioButton from "../Components/CustomRadioButton";
import IconButton from "../Components/IconButton";
import {
  getOptimalTextColor,
  getShadesOfBgColor,
  getShadesOfTextColor,
  Saturation,
} from "../hex-utils";
import { CartContext, PaletteContext } from "./Contexts";
import Preview from "./Preview";
import Cart from "./Cart";
import Palette from "./Palette";

function ColorPalette({ onSelected }) {
  // const [palette, setPalette] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedTextColor, setSelectedTextColor] = useState(null);
  //index in a row of the palette for the color picker
  // const [selectedColorGridIndex, setSelectedColorGridIndex] = useState({ row: -1, column: -1 });
  const [textColorShades, setTextColorShades] = useState([]);

  // const [selectedColorsHistory, setSelectedColorsHistory] = useState([]);
  // const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [colorsCart, setColorsCart] = useState([]);
  // const [saturation, setSaturation] = useState(Saturation.LOW);

  const addToCartHandler = useCallback((cart) => {
    setColorsCart((prev) => {
      let clone = [...prev];
      clone.push(cart);
      return clone;
    });
  });

  /*const viewShadesHandler = () => {
    const colors = getShadesOfBgColor(selectedColor, saturation);
    setPalette(colors);
    setSelectedColorsHistory((p) => {
      p.push(selectedColor);
      return [...p];
    });
    setCurrentHistoryIndex((p) => p + 1);
  };*/

  /*const resetHandler = () => {
    setSelectedColor(null);
    setSelectedTextColor(null);
    setSelectedColorGridIndex({});
    setTextColorShades([]);
    setSelectedColorsHistory([]);
    setCurrentHistoryIndex(-1);
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
  };*/

  //init
  /*useEffect(() => {
    const colors = getShadesOfBgColor();
    setPalette(colors);
  }, []);*/

  /*useEffect(() => {
    const colors = getShadesOfBgColor(selectedColor, saturation);
    setPalette(colors);
  }, [saturation]);*/

  /*function renderGrid() {
    const paletteIsEmpty = !palette || palette.length === 0;
    if (paletteIsEmpty) {
      return <Text>Palette is empty</Text>;
    }
    const colorSelectHandler = (row, column) => {
      const color = palette[row][column];
      const textColor = getOptimalTextColor(color);
      const textColorShades = getShadesOfTextColor(textColor);
      setSelectedColorGridIndex({ row, column });
      setSelectedColor(color);
      setSelectedTextColor(textColor);
      setTextColorShades(textColorShades);
    };
     const saturationButtons = [
    { label: "High", value: Saturation.HIGH },
    { label: "Med", value: Saturation.MEDIUM },
    { label: "Low", value: Saturation.LOW },
  ];


    return (
      <>
        {renderNavigationButtons()}
        <CustomRadioButton
          title={"Saturation Level"}
          checkedValue={Saturation.LOW}
          buttons={saturationButtons}
          onCheck={(val) => setSaturation(val)}
        />

        <ScrollView style={{ marginHorizontal: 15, paddingHorizontal: 10 }}>
          {palette.map((colors, i) => (
            <View key={i}>
              <ColorPicker
                style={[styles.paletteRowContainer, styles.shadow]}
                data={colors}
                currentIndex={
                  i === selectedColorGridIndex.row ? selectedColorGridIndex.column : undefined
                }
                onSelected={(pickerIndex) => colorSelectHandler(i, pickerIndex)}
              />
            </View>
          ))}
        </ScrollView>
        <View style={styles.depthContainer}>
          <CustomButton title="Reset" style={styles.capsule} onPress={resetHandler} />
          <CustomButton title="More shades" style={styles.capsule} onPress={viewShadesHandler} />
        </View>
      </>
    );
  }*/

  /*function renderNavigationButtons() {
    const nextDisabled = currentHistoryIndex === selectedColorsHistory.length - 1;
    const prevDisabled = currentHistoryIndex === -1;

    return (
      <View style={styles.navPagingContainer}>
        <IconButton
          name="arrow-back"
          color="darkgray"
          style={[styles.navButton, { left: 10 }]}
          disabled={prevDisabled}
          onPress={setPaletteProfilePrevious}
        />
        {selectedColorsHistory.map((color, i) => {
          const selected = currentHistoryIndex === i;
          return (
            <TouchableWithoutFeedback
              onPress={() => setPaletteProfileJump(i)}
              style={[styles.navPage, selected && styles.navPageSelected]}
            >
              <View style={[styles.navPageIcon, styles.shadow, { backgroundColor: color }]}></View>
            </TouchableWithoutFeedback>
          );
        })}
        <IconButton
          name="arrow-forward"
          color="darkgray"
          style={[styles.navButton, { right: 10 }]}
          disabled={nextDisabled}
          onPress={setPaletteProfileNext}
        />
      </View>
    );
  }*/

  return (
    <PaletteContext
      value={{
        selectedColor,
        selectedTextColor,
        textColorShades,
        setSelectedColor,
        setSelectedTextColor,
        setTextColorShades,
      }}
    >
      <CartContext value={{ colorsCart, addToCartHandler }}>
        <View style={styles.container}>
          <View style={styles.content}>
            <ScrollView>
              <Preview style={{ ...styles.preview, ...styles.borderContainer }} />
              <Palette style={{ ...styles.palette, ...styles.borderContainer }} />
              <Cart style={{ ...styles.cart, ...styles.borderContainer }} />
            </ScrollView>
          </View>
        </View>
      </CartContext>
    </PaletteContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 35,
    marginTop: 20,
    // rowGap: 12,
  },

  borderContainer: {
    margin: 5,
    borderWidth: 1,
    padding: 15,
    borderRadius: 25,
    borderColor: "lightgray",
  },
  preview: {},
  palette: {
    height:400
  },
  cart: {},

  paletteRowContainer: {
    margin: 10,
    borderRadius: 50,
    alignSelf: "center",
  },
  depthContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
    marginTop: 5,
    overflow: "hidden",
  },
  capsule: {
    borderRadius: 20,
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
    top: 0,
    height: 40,
    width: 40,
    backgroundColor: "lightgray",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  navPageSelected: {
    borderWidth: 2,
    borderColor: "lightgray",
    backgroundColor: "transparent",
    borderRadius: 4,
  },

  navPageIcon: {
    height: 20,
    width: 20,
    margin: 3,
    borderRadius: 4,
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
