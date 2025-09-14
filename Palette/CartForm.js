import { useContext, useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import CustomButton from "../Components/CustomButton";
import { PreviewContext, PaletteContext, CartContext } from "./Contexts";

function CartForm({ style }) {
  const [cartForm, setCartForm] = useState({ name: "", backgroundColor: "", color: "" });
  const { activeTextColor } = useContext(PreviewContext);
  const { selectedColor } = useContext(PaletteContext);
  const { addToCartHandler } = useContext(CartContext);

  useEffect(() => {
    if (selectedColor && activeTextColor)
      setCartForm((prev) => ({
        ...prev,
        backgroundColor: selectedColor,
        color: activeTextColor,
      }));
  }, [activeTextColor, selectedColor]);

  const onSubmitHandler = () => {
    addToCartHandler(cartForm);
    setCartForm({ name: "", backgroundColor: "", color: "" });
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <TextInput
          style={styles.textInput}
          placeholder="Give it a name..."
          value={cartForm.name}
          onChangeText={(name) => setCartForm((q) => ({ ...q, name }))}
        />
        <CustomButton
          title="Add To Cart"
          style={styles.button}
          onPress={onSubmitHandler}
          noShadow={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
    marginHorizontal: 25,
  },

  textInput: {
    flex: 2,
    lineHeight: 28,
    borderWidth: 2,
    borderColor: "lightgray",
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderRightWidth: 0,
    fontSize: 18,
    fontWeight: 400,
    padding: 5,
    paddingLeft: 20,
    color: "dimgray",
  },

  button: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  error: {
    color: "red",
  },
});
export default CartForm;
