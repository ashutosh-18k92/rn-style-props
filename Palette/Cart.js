import { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CartContext } from "./Contexts";

function Cart({ style }) {
  const { colorsCart } = useContext(CartContext);
  const [cart, setCart] = useState(colorsCart);

  useEffect(() => {
    setCart(colorsCart);
  }, [colorsCart]);

  if (!!!colorsCart.length) return <Text>Your Cart is empty!</Text>;
  return (
    <View style={[styles.cartContainer, style]}>
      <ScrollView style={styles.cartScroll}>
        {cart.map((c, i) => (
          <View
            key={i}
            style={[styles.cartItem, { backgroundColor: c.backgroundColor }, styles.shadow]}
          >
            <Text style={[styles.cartItemTitleText, { color: c.color }]}>{c.name}</Text>
            <Text style={[styles.cartItemBodyText, { color: c.color }]}>
              Background: {c.backgroundColor}{" "}
              <Text style={{ marginHorizontal: 15, fontWeight: 700 }}>/</Text> Text: {c.color}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cartContainer: {},
  cartScroll: {
    flex: 1,
    paddingVertical: 15,
  },
  cartItem: {
    height: 90,
    margin: 10,
    padding: 15,
    borderRadius: 5,
  },

  cartItemTitleText: {
    margin: 5,
    padding: 5,
    textAlign: "left",
    fontSize: 24,
  },

  cartItemBodyText: {
    fontSize: 18,
    fontWeight: 300,
  },
});

export default Cart;
