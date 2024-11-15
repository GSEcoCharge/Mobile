import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import colors from "@/constants/Colors";
import textStyles from "@/constants/TextStyles";

interface AuthActionButtonProps {
  text: string;
  onPress: () => void;
  style?: object;
}

export default function AuthActionButton({ text, onPress, style }: AuthActionButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.button, style]}>
        <Text style={[textStyles.label_large, { color: colors.white }]}>{text}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 320,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
