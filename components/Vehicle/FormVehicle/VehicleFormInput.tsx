import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  DimensionValue,
} from "react-native";
import COLORS from "@/constants/COLORS";
import TEXT_STYLES from "@/constants/TEXT_STYLES";

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  width?: DimensionValue;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  onlyDigits?: boolean;
}

export default function FormInput({
  label,
  value,
  onChangeText: onChangeTextInput,
  keyboardType,
  maxLength,
  width: inputWidth,
  autoCapitalize = "none",
  onlyDigits,
}: FormInputProps) {
  function handleTextOnlyDigits(value: string) {
    return value.replace(/\D/g, "");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={(text) => {
          if (onlyDigits) {
            onChangeTextInput(handleTextOnlyDigits(text));
          } else {
            onChangeTextInput(text);
          }
        }}
        style={[styles.input, { width: inputWidth }]}
        keyboardType={keyboardType}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
  },
  label: {
    ...TEXT_STYLES.label_large,
    color: COLORS.normal,
    fontFamily: "WorkSans_500Medium",
  },
  input: {
    ...TEXT_STYLES.body_large,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.subtleLight,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});
