import { useContext, useEffect, useState } from "react";
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
import { PaletteContext } from "./Contexts";

function Palette({ onSelected, style }) {
  const [palette, setPalette] = useState(null);
  const { setSelectedColor, setSelectedTextColor, setTextColorShades, selectedColor } =
    useContext(PaletteContext);

  const [selectedColorGridIndex, setSelectedColorGridIndex] = useState({ row: -1, column: -1 });
  const [selectedColorsHistory, setSelectedColorsHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [saturation, setSaturation] = useState(Saturation.LOW);

  const viewShadesHandler = () => {
    const colors = getShadesOfBgColor(selectedColor, saturation);
    setPalette(colors);
    setSelectedColorsHistory((p) => {
      p.push(selectedColor);
      return [...p];
    });
    setCurrentHistoryIndex((p) => p + 1);
  };

  const resetHandler = () => {
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

  const colorSelectHandler = (row, column) => {
    const color = palette[row][column];
    const textColor = getOptimalTextColor(color);
    const textColorShades = getShadesOfTextColor(textColor);
    setSelectedColorGridIndex({ row, column });
    setSelectedColor(color);
    setSelectedTextColor(textColor);
    setTextColorShades(textColorShades);
  };

  function renderNavigationButtons() {
    const nextDisabled = currentHistoryIndex === selectedColorsHistory.length - 1;
    const prevDisabled = currentHistoryIndex === -1;

    return (
      <View style={styles.navigationContainer}>
        <IconButton
          name="arrow-back"
          color="darkgray"
          style={styles.navButton}
          disabled={prevDisabled}
          onPress={setPaletteProfilePrevious}
        />
        <View style={styles.indexIconsContainer}>
          {selectedColorsHistory.map((color, i) => {
            const selected = currentHistoryIndex === i;
            return (
              <TouchableWithoutFeedback
                onPress={() => setPaletteProfileJump(i)}
                style={[styles.iconContainer, selected && styles.iconContainerSelected]}
              >
                <View style={[styles.icon, styles.shadow, { backgroundColor: color }]} />
              </TouchableWithoutFeedback>
            );
          })}
        </View>
        <IconButton
          name="arrow-forward"
          color="darkgray"
          style={styles.navButton}
          disabled={nextDisabled}
          onPress={setPaletteProfileNext}
        />
      </View>
    );
  }

  function renderSaturationControls() {
    const saturationButtons = [
      { label: "High", value: Saturation.HIGH },
      { label: "Med", value: Saturation.MEDIUM },
      { label: "Low", value: Saturation.LOW },
    ];

    return (
      <CustomRadioButton
        title={"Saturation Level"}
        checkedValue={Saturation.LOW}
        buttons={saturationButtons}
        onCheck={(val) => setSaturation(val)}
      />
    );
  }

  function renderColorPicker() {
    return palette.map((colors, i) => (
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
    ));
  }

  if (!palette || palette.length === 0) {
    return <Text>Palette is empty, Choose a color to begin.</Text>;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <View style={styles.pickerContainer}>
          <ScrollView>{renderColorPicker()}</ScrollView>
        </View>
        {renderNavigationButtons()}
        {renderSaturationControls()}

        <View style={styles.bottomButtons}>
          <CustomButton title="Reset" style={styles.capsule} onPress={resetHandler} />
          <CustomButton title="More shades" style={styles.capsule} onPress={viewShadesHandler} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  content: { flex: 1 },
  pickerContainer: {
    flex: 1,
    margin: 15,
    paddingHorizontal: 10,
  },
  paletteRowContainer: {
    margin: 10,
    borderRadius: 50,
    alignSelf: "center",
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
    marginTop: 5,
    overflow: "hidden",
  },
  capsule: {
    borderRadius: 20,
  },

  navigationContainer: {
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  indexIconsContainer: {
    flex: 1,
    flexDirection: "row",
  },
  iconContainer: {
    marginRight: 8,
    alignItems: "center",
    alignContent: "center",
  },
  iconContainerSelected: {
    borderWidth: 2,
    borderColor: "lightgray",
    backgroundColor: "transparent",
    borderRadius: 4,
  },
  icon: {
    height: 20,
    width: 20,
    margin: 3,
    borderRadius: 4,
  },

  navButton: {
    // flex: 1,
    // position: "absolute",
    // top: 0,
    height: 32,
    width: 32,
    backgroundColor: "lightgray",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
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

export default Palette;
