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
  const [activePickerIndex, setActivePickerIndex] = useState(null);

  useEffect(() => {
    setActiveTextColor(selectedTextColor);
  }, [selectedTextColor]);

  const showPreview = !!selectedColor && !!activeTextColor;

  function renderPreview() {
    return (
      <View style={[styles.preview, { backgroundColor: selectedColor }, GlobalStyles.shadow]}>
        <Text style={[styles.text, { backgroundColor: activeTextColor, color: selectedColor }]}>
          Background {selectedColor}
        </Text>

        <Text style={[styles.text, { color: activeTextColor }]}>Text {activeTextColor}</Text>
        <ColorPicker
          data={textColorShades}
          currentIndex={activePickerIndex}
          onSelected={(index) => {
            setActivePickerIndex(index);
            setActiveTextColor(textColorShades[index]);
          }}
        />
      </View>
    );
  }

  function renderNoPreview() {
    return (
      <View style={[styles.preview, styles.emptyContent, GlobalStyles.shadow]}>
        <Text style={styles.text}>No Preview</Text>
      </View>
    );
  }

  return (
    <PreviewContext value={{ activeTextColor }}>
      <View style={[styles.container, GlobalStyles.shadow, style]}>
        <View style={styles.content}>
          {showPreview ? renderPreview() : renderNoPreview()}
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
  container: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  content: { flex: 1 },
  preview: {
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 35,
    alignItems: "center",
  },
  emptyContent: {
    justifyContent: "center",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "lightgray",
    width: "100%",
  },
  text: {
    fontSize: 48,
    fontWeight: 900,
    marginBottom: 15,
    textAlign: "center",
    padding: 10,
    borderRadius: 25,
  },

  form: {
    // marginTop: 5,
    // flex: 1,
    paddingVertical: 10,
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
