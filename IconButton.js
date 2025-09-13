import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";

export default function IconButton({ name, color, size, onPress, disabled, style }) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[style, disabled && { color: "#999" }]}>
      <Ionicons name={name} size={size ?? 32} color={disabled ? "#888" : color ?? "black"} />
    </Pressable>
  );
}
