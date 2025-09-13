import { Pressable, StyleSheet, Text } from "react-native";

export default function CustomButton({ title, disabled, onPress, style, textStyle }) {
  const onPressHandler = (e) => {
    onPress && onPress(e);
  };
  return (
    <Pressable
      style={Array.isArray(style) ? [style.button, ...style] : [styles.button, style]}
      disabled={disabled}
      onPress={onPressHandler}
    >
      <Text
        style={
          Array.isArray(textStyle)
            ? [styles.textStyle, ...textStyle]
            : [styles.textStyle, textStyle]
        }
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal:12,
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 5 },
    backgroundColor: "steelblue",
  },
  textStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
    paddingHorizontal:8,
    paddingVertical:5
  },
});
