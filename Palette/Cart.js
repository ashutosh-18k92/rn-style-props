import { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CartContext } from "./Contexts";

function Cart({ style }) {
  const { colorsCart } = useContext(CartContext);
  const [cart, setCart] = useState(colorsCart);

  useEffect(() => {
    setCart(colorsCart);
  }, [colorsCart]);

  function renderCartItem(cart, i) {
    const { name, color, backgroundColor } = cart;
    return (
      <View key={i} style={[styles.item, { backgroundColor }, styles.shadow]}>
        <Text style={[styles.title, { color }]}>{name}</Text>
        <Text style={[styles.body, { color }]}>
          Background: {backgroundColor} Text: {color}
        </Text>
      </View>
    );
  }

  if (colorsCart.length == 0)
    return (
      <View style={[styles.container, style]}>
        <View style={styles.content}>
          <Text>Your Cart is empty!</Text>
        </View>
      </View>
    );
  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <ScrollView>{cart.map(renderCartItem)}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  content: {
    flex: 1,
    margin: 5,
  },
  item: {
    height: 90,
    margin: 10,
    padding: 15,
    borderRadius: 5,
  },

  title: {
    marginBottom: 5,
    textAlign: "left",
    fontSize: 24,
  },

  body: {
    fontSize: 18,
    fontWeight: 300,
  },
});

export default Cart;
