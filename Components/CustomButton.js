import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text } from "react-native";

function CustomButton({ title, disabled, onPress, style, textStyle, noShadow }) {
  const onPressHandler = (e) => {
    onPress && onPress(e);
  };

  const buttonStyle = [styles.button];

  if (Array.isArray(style)) {
    buttonStyle.concat(style);
  } else {
    buttonStyle.push(style);
  }

  if (!noShadow) {
    buttonStyle.push(styles.shadow);
  }

  return (
    <LinearGradient colors={["dodgerblue", "deepskyblue"]} style={buttonStyle}>
      <Pressable disabled={disabled} onPress={onPressHandler}>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: "transparent",
  },
  textStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: 700,
    textAlign: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  shadow: {
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 5 },
  },
});

export default CustomButton;
