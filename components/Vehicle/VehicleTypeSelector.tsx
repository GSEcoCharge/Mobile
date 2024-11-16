import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import COLORS from "@/constants/COLORS";
import TEXT_STYLES from "@/constants/TEXT_STYLES";

interface VehicleTypeSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

export default function VehicleTypeSelector({ selectedType, onSelect }: VehicleTypeSelectorProps) {
  const types = ["Híbrido", "Elétrico"];

  return (
    <View style={styles.container}>
      {types.map((type) => (
        <TouchableOpacity
          key={type}
          style={[
            styles.card,
            selectedType === type && styles.cardSelected,
          ]}
          onPress={() => onSelect(type)}
        >
          <Text
            style={[
              styles.text,
              selectedType === type && styles.textSelected,
            ]}
          >
            {type}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 16,
  },
  card: {
    flex: 1,
    height: 136,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.subtleLight,
    justifyContent: "center",
    alignItems: "center",
  },
  cardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surface,
  },
  text: {
    ...TEXT_STYLES.label_large,
    color: COLORS.subtleDark,
  },
  textSelected: {
    color: COLORS.primary,
  },
});
