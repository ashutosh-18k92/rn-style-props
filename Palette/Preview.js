import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import ColorPicker from "../Components/ColorPicker";
import GlobalStyles from "../Styles";
import { PaletteContext } from "./Contexts";
import CustomButton from "../Components/CustomButton";
import { PreviewContext } from "./Contexts";
import CartForm from "./CartForm";

function Preview({ style }) {
  const { selectedColor, selectedTextColor, textColorShades } = useContext(PaletteContext);
  const [activeTextColor, setActiveTextColor] = useState(selectedTextColor);
  const [activePickerIndex, setActivePickerIndex] = useState(0);
  const [showMiniPicker, setShowMiniPicker] = useState(true);

  useEffect(() => {
    setActiveTextColor(selectedTextColor);
  }, [selectedTextColor]);

  function renderPreview() {
    return (
      <View style={[styles.preview, { backgroundColor: selectedColor }]}>
        <Text
          style={[
            styles.text,
            { backgroundColor: activeTextColor, color: selectedColor ?? "lightgray" },
          ]}
        >
          Background {selectedColor || "#None"}
        </Text>

        <Text
          style={[
            styles.text,
            { color: activeTextColor ?? "lightgray", backgroundColor: "transparent" },
          ]}
        >
          Text {activeTextColor || "#None"}
        </Text>

        <ColorPicker
          data={textColorShades}
          minimized={showMiniPicker}
          onMaximize={() => setShowMiniPicker((p) => !p)}
          currentIndex={activePickerIndex}
          onSelected={(index) => {
            setActivePickerIndex(index);
            setActiveTextColor(textColorShades[index]);
          }}
        />
      </View>
    );
  }

  return (
    <PreviewContext value={{ activeTextColor }}>
      <View style={[styles.container, style]}>
        <View style={styles.content}>
          {renderPreview()}

          <CartForm
            style={{
              ...styles.form,
              ...GlobalStyles.shadow,
              backgroundColor: activeTextColor ?? "darksalmon",
            }}
          />
        </View>
      </View>
    </PreviewContext>
  );
}

const styles = StyleSheet.create({
  container: {},
  content: {},
  preview: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 5,
    alignItems: "center",
  },
  emptyContent: {
    justifyContent: "center",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "lightgray",
  },
  text: {
    fontSize: 36,
    fontWeight: 900,
    margin: 15,
    textAlign: "center",
    padding: 10,
    borderRadius: 25,
  },

  form: {
    paddingVertical: 17,
    backgroundColor: "salmon",
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
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

export default Preview;
