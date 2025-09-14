import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

function CustomPicker({ label, data, currentIndex, onSelected }) {
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
                    styles.itemStyleHorizontal,
                    selected && styles.itemSelectedStyleHorizontal,
                  ]}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: selected ? "black" : "grey",
                      fontWeight: selected ? "bold" : "normal",
                    }}
                  >
                    {item + ""}
                  </Text>
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
    justifyContent: "center",
    color: "black",
  },
  itemStyleHorizontal: {
    marginRight: 10,
    height: 50,
    padding: 8,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    textAlign: "center",
    justifyContent: "center",
  },
  itemSelectedStyleHorizontal: {
    borderWidth: 2,
    borderColor: "#06bcee",
  },

  title: {
    fontWeight: "bold",
    marginVertical: 8,
  },
});
export default CustomPicker;
