import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import colors from "@/constants/Colors";
import textStyles from "@/constants/TextStyles";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

export default function AuthInputField({ label, value, onChangeText, secureTextEntry = false, keyboardType ,placeholder }: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={textStyles.label_medium}>{label}</Text>
      <TextInput
        selectionColor={colors.primary}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
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
    borderColor: colors.subtleLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
