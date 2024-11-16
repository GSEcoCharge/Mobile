import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import COLORS from "@/constants/COLORS";
import TEXT_STYLES from "@/constants/TEXT_STYLES";

interface AuthActionButtonProps {
  text: string;
  onPress: () => void;
  style?: object;
}

export default function AuthActionButton({ text, onPress, style }: AuthActionButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.button, style]}>
        <Text style={[TEXT_STYLES.label_large, { color: COLORS.white }]}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 320,
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
