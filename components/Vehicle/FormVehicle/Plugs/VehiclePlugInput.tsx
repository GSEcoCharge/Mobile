import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "@/constants/COLORS";
import TEXT_STYLES from "@/constants/TEXT_STYLES";

interface PlugInputProps {
  selectedPlugs: PlugOption[];
  onEditPlugs: () => void;
}

export default function PlugInput({
  selectedPlugs,
  onEditPlugs,
}: PlugInputProps) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Plugs ou adaptadores</Text>
      <View style={styles.plugListContainer}>
        {selectedPlugs.length > 0 &&
          selectedPlugs.map((plug) => (
            <View key={plug.id} style={styles.plugItem}>
              <Text style={[TEXT_STYLES.body_medium, { color: "red" }]}>
                {plug.name}
              </Text>
            </View>
          ))}
        <TouchableOpacity style={styles.selectButton} onPress={onEditPlugs}>
          <Text style={styles.buttonText}>
            {selectedPlugs.length > 0 ? "Alterar" : "Selecionar"}
          </Text>
          {selectedPlugs.length === 0 ? (
            <Ionicons
              name="chevron-down-circle-outline"
              size={20}
              color={COLORS.subtleDark}
            />
          ) : (
            <MaterialCommunityIcons
              name="power-plug-outline"
              size={20}
              color={COLORS.subtleDark}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    gap: 8,
  },
  label: {
    ...TEXT_STYLES.label_large,
    color: COLORS.normal,
  },
  plugListContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    flexWrap: "wrap",
  },
  plugItem: {
    backgroundColor: COLORS.separator,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 24,
  },
  plugText: {
    ...TEXT_STYLES.body_medium,
    color: "red",
  },
  selectButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.subtleLight,
  },
  buttonText: {
    ...TEXT_STYLES.body_medium,
    color: COLORS.subtleDark,
    marginRight: 4,
  },
  emptyText: {
    color: COLORS.subtleDark,
    fontStyle: "italic",
  },
});
