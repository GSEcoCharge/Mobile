import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import COLORS from "@/constants/COLORS";
import TEXT_STYLES from "@/constants/TEXT_STYLES";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

export default function AuthInputField({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType,
  placeholder,
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={TEXT_STYLES.label_medium}>{label}</Text>
      <TextInput
        selectionColor={COLORS.primary}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
  },
  input: {
    width: 320,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.subtleLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
