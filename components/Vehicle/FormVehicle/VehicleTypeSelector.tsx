import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import COLORS from "@/constants/COLORS";
import TEXT_STYLES from "@/constants/TEXT_STYLES";

interface VehicleType {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconSelected: keyof typeof Ionicons.glyphMap;
}

interface VehicleTypeSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

export default function VehicleTypeSelector({
  selectedType,
  onSelect,
}: VehicleTypeSelectorProps) {
  const types: VehicleType[] = [
    { label: "Híbrido", icon: "leaf-outline", iconSelected: "leaf" },
    { label: "Elétrico", icon: "flash-outline", iconSelected: "flash" },
  ];

  return (
    <View style={styles.container}>
      {types.map(({ label, icon, iconSelected }) => (
        <TouchableOpacity
          key={label}
          style={[styles.card, selectedType === label && styles.cardSelected]}
          onPress={() => onSelect(label)}
        >
          <Ionicons
            name={selectedType === label ? iconSelected : icon}
            size={48}
            color={selectedType === label ? COLORS.primary : COLORS.subtleDark}
          />
          <Text
            style={[styles.text, selectedType === label && styles.textSelected]}
          >
            {label}
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
    gap: 8,
  },
  cardSelected: {
    borderColor: COLORS.primary,
  },
  text: {
    ...TEXT_STYLES.headline_small,
    color: COLORS.subtleDark,
  },
  textSelected: {
    color: COLORS.primary,
  },
});
