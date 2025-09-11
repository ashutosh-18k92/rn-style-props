import Slider from "@react-native-community/slider";
import { Text, View, StyleSheet } from "react-native";

function CustomSlider({
  label,
  handleValueChange,
  step = 1,
  minimumValue = 0,
  maximumValue = 10,
  value,
}) {
  return (
    <>
      {label && <Text style={styles.title}>{`${label} (${value.toFixed(2)})`}</Text>}
      <View style={styles.wrapperHorizontal}>
        <Slider
          thumbTintColor="#06bcee"
          minimumTrackTintColor="#64d7ffbb"
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          step={step}
          onValueChange={handleValueChange}
          value={value}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapperHorizontal: {
    justifyContent: "center",
    color: "black",
  },
  title: {
    fontWeight: "bold",
    marginVertical: 8,
  },
});

export default CustomSlider;
