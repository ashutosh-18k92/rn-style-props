import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CustomTabs from "../Components/CustomTabs";
import Cart from "./Cart";
import { CartContext, PaletteContext } from "./Contexts";
import Palette from "./Palette";
import Preview from "./Preview";

function ColorPalette({ onSelected }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedTextColor, setSelectedTextColor] = useState(null);
  const [textColorShades, setTextColorShades] = useState([]);
  const [colorsCart, setColorsCart] = useState([]);

  const tabs = [
    { label: "Palette", value: "palette" },
    { label: "Cart", value: "cart" },
  ];
  const [activeTab, setActiveTab] = useState("palette");

  const addToCartHandler = useCallback((cart) => {
    setColorsCart((prev) => {
      let clone = [...prev];
      clone.push(cart);
      return clone;
    });
  });

  const renderTab = () => {
    switch (activeTab) {
      case "palette":
        return (
          <>
            <Preview style={{ ...styles.preview, ...styles.borderContainer }} />
            <Palette style={{ ...styles.palette, ...styles.borderContainer }} />
          </>
        );
      case "cart":
        return <Cart style={{ ...styles.cart, ...styles.borderContainer }} />;
    }
  };

  return (
    <PaletteContext
      value={{
        selectedColor,
        selectedTextColor,
        textColorShades,
        setSelectedColor,
        setSelectedTextColor,
        setTextColorShades,
      }}
    >
      <CartContext value={{ colorsCart, addToCartHandler }}>
        <View style={styles.container}>
          <View style={styles.content}>
            <CustomTabs
              tabs={[
                { label: "Palette", value: "palette" },
                { label: "Cart", value: "cart" },
              ]}
              activeTab={"palette"}
              onSelect={setActiveTab}
            />
            {renderTab()}
          </View>
        </View>
      </CartContext>
    </PaletteContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 35,
    marginTop: 20,
  },

  borderContainer: {
    margin: 5,
    borderWidth: 1,
    padding: 15,
    borderRadius: 25,
    borderColor: "lightgray",
  },
  preview: {},
  palette: { flex: 1 },
  cart: { flex: 1 },

  paletteRowContainer: {
    margin: 10,
    borderRadius: 50,
    alignSelf: "center",
  },
  depthContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
    marginTop: 5,
    overflow: "hidden",
  },
  capsule: {
    borderRadius: 20,
  },

  navPagingContainer: {
    flexDirection: "row",
    marginVertical: 5,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  navPage: {
    marginRight: 8,
    alignItems: "center",
    alignContent: "center",
  },

  navButton: {
    position: "absolute",
    top: 0,
    height: 40,
    width: 40,
    backgroundColor: "lightgray",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  navPageSelected: {
    borderWidth: 2,
    borderColor: "lightgray",
    backgroundColor: "transparent",
    borderRadius: 4,
  },

  navPageIcon: {
    height: 20,
    width: 20,
    margin: 3,
    borderRadius: 4,
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ColorPalette;
