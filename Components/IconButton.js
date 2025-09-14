import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";

export default function IconButton({ name, color, size, onPress, disabled, style }) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[style, disabled && { color: "whitesmoke" }]}>
      <Ionicons name={name} size={size ?? 32} color={disabled ? "ghostwhite" : color ?? "black"} />
    </Pressable>
  );
}
