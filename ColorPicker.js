import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

function ColorPicker({ label, data, currentIndex, onSelected }) {
  return (
    <>
      <Text style={styles.title}>{label}</Text>
      <View style={styles.wrapperHorizontal}>
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
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  wrapperHorizontal: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:'yellow'
  },
  color: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  colorSelected: {
    height: 19,
    width: 19,
    borderRadius: 10,
  },

  wrapper: {
    marginRight: 10,
    height: 30,
    width: 30,
    backgroundColor: "white",
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
