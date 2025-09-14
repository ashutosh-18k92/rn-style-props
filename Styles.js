import { StyleSheet } from "react-native";
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#918f8f30",
  },

  depthContainer: {
    flexDirection: "row",
    position: "absolute",
    alignSelf: "center",
    bottom: 15,
    left: 0,
    right: 0,
    justifyContent: "space-evenly",
    padding: 10,
    overflow: "hidden",
  },

  capsule: {
    borderRadius: 30,
  },

  content: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  paletteRowContainer: {
    margin: 10,
    borderRadius: 50,
    alignSelf: "center",
  },
  gridContainer: {
    flex: 1,
    marginHorizontal: 15,
    paddingBottom: 5,
    marginBottom: 30,
  },

  cartScroll: { flex: 1, paddingVertical: 15 },

  cartContainer: {
    flex: 1,
    marginHorizontal: 10,
    padding: 25,
  },
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    top: "50%",
    height: 40,
    width: 40,
    backgroundColor: "lightgray",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  navPageSelected: {
    borderWidth: 2,
    borderColor: "#6e6868ff",
    backgroundColor: "transparent",
    borderRadius: 4,
  },

  navPageIcon: {
    height: 20,
    width: 20,
    margin: 3,
    borderRadius: 4,
  },

  paletteContainer: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 35,
    padding: 40,
  },
  palette: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 60,
    borderRadius: 5,
    margin: 2,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(60, 51, 51, 0.65)",
  },

  previewContainer: {
    flex: 1,
    margin: 20,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  previewContent: {
    height: "100%",
    width: "100%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 35,
    padding: 35,
    alignItems: "center",
  },

  modalView: {
    margin: 20,
    minHeight: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },

  modalViewEmpty: {
    justifyContent: "center",
  },

  modalText: {
    fontSize: 48,
    fontWeight: 900,
    marginBottom: 15,
    textAlign: "center",
  },

  previewText: {
    fontSize: 48,
    fontWeight: 900,
    marginBottom: 15,
    textAlign: "center",
    padding: 10,
    borderRadius: 25,
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

  cartForm: {},
  colorNameInput: {
    height: 40,
    width: 150,
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
