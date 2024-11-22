import TEXT_STYLES from "@/constants/TEXT_STYLES";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Text>Carregando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...TEXT_STYLES.headline_small,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
