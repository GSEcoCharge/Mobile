import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import COLORS from "@/constants/COLORS";
import TEXT_STYLES from "@/constants/TEXT_STYLES";
import ActionButton from "./VehicleActionButton";
import { Ionicons } from "@expo/vector-icons";

interface PlugsModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (selectedPlugs: PlugOption[]) => void;
  initialSelectedPlugs?: PlugOption[];
}

const PLUG_OPTIONS: PlugOption[] = [
  { id: "ccs", name: "CCS 2" },
  { id: "type2", name: "Tipo 2" },
  { id: "type1", name: "Tipo 1" },
  { id: "gbt", name: "GB/T" },
  { id: "chademo", name: "CHAdeMO" },
  { id: "tesla", name: "Tesla" },
];

export default function PlugsModal({
  visible,
  onClose,
  onSave,
  initialSelectedPlugs = [],
}: PlugsModalProps) {
  const [selectedPlugs, setSelectedPlugs] =
    useState<PlugOption[]>(initialSelectedPlugs);

  const togglePlugSelection = (plug: PlugOption) => {
    setSelectedPlugs((prev) =>
      prev.some((p) => p.id === plug.id)
        ? prev.filter((p) => p.id !== plug.id)
        : [...prev, plug]
    );
  };

  const handleSave = () => {
    onSave(selectedPlugs);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={TEXT_STYLES.headline_small}>
            Selecione todos os plugs
          </Text>
          <FlatList
            data={PLUG_OPTIONS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.plugOption}
                onPress={() => togglePlugSelection(item)}
              >
                <Ionicons
                  name={
                    selectedPlugs.some((plug) => plug.id === item.id)
                      ? "checkbox"
                      : "square-outline"
                  }
                  size={24}
                  color={COLORS.primary}
                  style={styles.checkbox}
                />
                <Text style={TEXT_STYLES.body_large}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <View style={styles.actions}>
            <ActionButton
              onPress={onClose}
              text="Cancelar"
              isPrimary={false}
              alignSelf="center"
            />
            <ActionButton
              onPress={handleSave}
              text="Confirmar Plugs"
              isPrimary={true}
              alignSelf="center"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    width: "80%",
    gap: 8,
  },
  plugOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.separator,
  },
  checkbox: {
    marginRight: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  actionButton: {
    padding: 8,
    borderRadius: 4,
    width: "45%",
    alignItems: "center",
  },
  cancelText: {
    color: COLORS.error,
  },
  saveText: {
    color: COLORS.primary,
  },
});
