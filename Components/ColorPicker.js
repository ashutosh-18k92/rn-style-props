import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function ColorPicker({ label, data, currentIndex, onSelected, style }) {
  if (!data || !!!data.length) return;
  return (
    <>
      {label && <Text style={styles.title}>{label}</Text>}

      <LinearGradient
        colors={["rgba(203, 205, 208, 0.45)", "rgba(203, 205, 208, 0.60)"]}
        style={
          Array.isArray(style)
            ? [styles.wrapperHorizontal, ...style]
            : [styles.wrapperHorizontal, style]
        }
      >
        <FlatList
          bounces
          horizontal
          data={data}
          keyExtractor={(item) => String(item)}
          renderItem={({ item, index }) => {
            const selected = index === currentIndex;
            return (
              <TouchableWithoutFeedback onPress={() => onSelected(index)}>
                <View
                  style={[
                    styles.wrapper,
                    selected && styles.selectedWrapper,
                    { borderColor: item },
                  ]}
                >
                  <View
                    style={[
                      styles.color,
                      { backgroundColor: item },
                      selected && styles.colorSelected,
                    ]}
                  ></View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </LinearGradient>
    </>
  );
}
const styles = StyleSheet.create({
  wrapperHorizontal: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 30,
  },
  color: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  colorSelected: {
    height: 18,
    width: 18,
    borderRadius: 10,
  },

  wrapper: {
    marginRight: 10,
    height: 30,
    width: 30,
    backgroundColor: "rgba(210, 210, 210, 0.1)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  selectedWrapper: {
    borderWidth: 4,
  },

  title: {
    fontWeight: "bold",
    marginVertical: 8,
  },
});
export default ColorPicker;
