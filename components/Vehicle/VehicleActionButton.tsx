import React from "react";
import { View, Text, StyleSheet } from "react-native";
import COLORS from "@/constants/COLORS";
import TEXT_STYLES from "@/constants/TEXT_STYLES";

interface ActionButtonProps {
  text: string;
  onPress: () => void;
  isPrimary: boolean;
}

export default function ActionButton({ text, onPress, isPrimary }: ActionButtonProps) {
  return (
    <View
      style={[
        styles.button,
        isPrimary ? styles.primary : styles.secondary,
      ]}
      onTouchStart={onPress}
    >
      <Text
        style={[
          TEXT_STYLES.label_medium,
          isPrimary ? styles.primaryText : styles.secondaryText,
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 32,
    flexGrow: 1,
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  primaryText: {
    color: COLORS.white,
    textAlign: "center",
  },
  secondaryText: {
    color: COLORS.primary,
    textAlign: "center",
  },
});
