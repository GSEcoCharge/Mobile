import React, { useState } from "react";
import {
  Modal,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import COLORS from "@/constants/COLORS";
import TEXT_STYLES from "@/constants/TEXT_STYLES";
import ActionButton from "../VehicleActionButton";
import { Ionicons } from "@expo/vector-icons";
import vehicleOptions from "./vehicleOptions.json";
import { VehicleOptions } from "@/types/vehicle/vehicle-options";

type ModelSelectorModalProps = {
  visible: boolean;
  onClose: () => void;
  selectedBrand: string;
  onSave: (model: {
    name: string;
    battery_capacity: number;
    autonomy: number;
  }) => void;
};

export default function ModelSelectorModal({
  visible,
  onClose,
  onSave,
  selectedBrand,
}: ModelSelectorModalProps) {
  const options: VehicleOptions = vehicleOptions;
  const models =
    options.models[selectedBrand]?.sort((a, b) =>
      a.name.localeCompare(b.name)
    ) || [];

  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [filterText, setFilterText] = useState("");

  const filteredModels = filterText
    ? models.filter((model) =>
        model.name.toLowerCase().includes(filterText.toLowerCase())
      )
    : models;

  const handleSave = () => {
    if (!selectedModel) {
      Alert.alert("Selecione ou adicione um modelo");
      return;
    }
    const model = models.find((m) => m.name === selectedModel) || {
      name: selectedModel,
      battery_capacity: 0,
      autonomy: 0,
    };
    onSave(model);
    setFilterText("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Selecione o Modelo</Text>
          <TextInput
            style={styles.input}
            placeholder="Filtrar ou adicionar novo modelo"
            value={filterText}
            onChangeText={(text) => {
              setFilterText(text);
              if (
                models.some(
                  (model) => model.name.toLowerCase() === text.toLowerCase()
                )
              ) {
                setSelectedModel(
                  models.find(
                    (model) => model.name.toLowerCase() === text.toLowerCase()
                  )?.name ?? null
                );
              } else {
                setSelectedModel(text);
              }
            }}
          />
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {filterText &&
              !filteredModels.some(
                (m) => m.name.toLowerCase() === filterText.toLowerCase()
              ) && (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => setSelectedModel(filterText)}
                >
                  <Ionicons
                    name={
                      selectedModel?.toLowerCase() === filterText.toLowerCase()
                        ? "checkbox"
                        : "square-outline"
                    }
                    size={24}
                    color={COLORS.primary}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.optionText}>
                    Adicionar '{filterText}'
                  </Text>
                </TouchableOpacity>
              )}
            {filteredModels.map((item) => (
              <TouchableOpacity
                key={item.name}
                style={styles.option}
                onPress={() => setSelectedModel(item.name)}
              >
                <Ionicons
                  name={
                    selectedModel?.toLowerCase() === item.name.toLowerCase()
                      ? "checkbox"
                      : "square-outline"
                  }
                  size={24}
                  color={COLORS.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.optionText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View style={styles.actions}>
            <ActionButton
              onPress={onClose}
              text="Cancelar"
              isPrimary={false}
              alignSelf="center"
            />
            <ActionButton
              onPress={handleSave}
              text="Confirmar Modelo"
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 32,
    maxHeight: "80%",
  },
  title: {
    ...TEXT_STYLES.headline_small,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    ...TEXT_STYLES.body_large,
    borderColor: COLORS.separator,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.separator,
  },
  optionText: {
    ...TEXT_STYLES.body_large,
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
