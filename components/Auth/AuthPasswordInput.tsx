import React from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import HideEye from "@/assets/svg/hide_eye";
import ShowEye from "@/assets/svg/show_eye";
import COLORS from "@/constants/COLORS";

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
}

export default function AuthPasswordInput({
  value,
  onChangeText,
  showPassword,
  onTogglePassword,
}: PasswordInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        selectionColor={COLORS.primary}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        secureTextEntry={!showPassword}
      />
      <Pressable style={styles.icon} onPress={onTogglePassword}>
        {showPassword ? (
          <HideEye color={COLORS.subtleDark} />
        ) : (
          <ShowEye color={COLORS.subtleDark} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 320,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.subtleLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
  },
  icon: {
    position: "absolute",
    right: 16,
    top: 12,
  },
});
