import { StyleSheet, Switch, Text, View } from "react-native";

function CustomSwitch({ label, handleValueChange, value }) {
  return (
    <>
      <Text style={styles.title}>{label}</Text>
      <View style={{ alignItems: "flex-start" }}>
        <Switch onValueChange={handleValueChange} value={value} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    marginVertical: 8,
  },
});

export default CustomSwitch;
