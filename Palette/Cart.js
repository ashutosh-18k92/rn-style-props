import { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { CartContext } from "./Contexts";

function Cart({ style }) {
  const { colorsCart } = useContext(CartContext);
  const [cart, setCart] = useState(colorsCart);

  useEffect(() => {
    setCart(colorsCart);
  }, [colorsCart]);

  if (!!!colorsCart.length)
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
        <ScrollView>
          {cart.map((c, i) => (
            <View
              key={i}
              style={[styles.item, { backgroundColor: c.backgroundColor }, styles.shadow]}
            >
              <Text style={[styles.title, { color: c.color }]}>{c.name}</Text>
              <Text style={[styles.body, { color: c.color }]}>
                Background: {c.backgroundColor}{" "}
                <Text style={{ marginHorizontal: 15, fontWeight: 700 }}>/</Text> Text: {c.color}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  content: {
    width: "100%",
    paddingVertical: 15,
  },
  item: {
    height: 90,
    margin: 10,
    padding: 15,
    borderRadius: 5,
  },

  title: {
    margin: 5,
    padding: 5,
    textAlign: "left",
    fontSize: 24,
  },

  body: {
    fontSize: 18,
    fontWeight: 300,
  },
});

export default Cart;
