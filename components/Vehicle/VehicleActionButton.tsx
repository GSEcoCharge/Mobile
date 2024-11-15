import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "@/constants/Colors";
import textStyles from "@/constants/TextStyles";

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
          textStyles.label_medium,
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
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  primaryText: {
    color: colors.white,
    textAlign: "center",
  },
  secondaryText: {
    color: colors.primary,
    textAlign: "center",
  },
});
