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
import { Ionicons } from "@expo/vector-icons";
import TEXT_STYLES from "@/constants/TEXT_STYLES";
import ActionButton from "../VehicleActionButton";
import vehicleOptions from "./vehicleOptions.json";

const brands = vehicleOptions.brands.sort((a, b) => a.localeCompare(b));

interface BrandSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (brand: string) => void;
}

export default function BrandSelectorModal({
  visible,
  onClose,
  onSave,
}: BrandSelectorModalProps) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [filterText, setFilterText] = useState("");

  const filteredBrands = filterText
    ? brands.filter((brand) =>
        brand.toLowerCase().includes(filterText.toLowerCase())
      )
    : brands;

  const handleSave = () => {
    if (!selectedBrand) {
      Alert.alert("Selecione ou adicione uma marca");
      return;
    }
    onSave(selectedBrand);
    setFilterText("");
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Selecione a Marca</Text>
          <TextInput
            style={styles.input}
            placeholder="Filtrar ou adicionar nova marca"
            value={filterText}
            onChangeText={(text) => {
              setFilterText(text);
              if (brands.some((brand) => brand.toLowerCase() === text.toLowerCase())) {
                setSelectedBrand(brands.find((brand) => brand.toLowerCase() === text.toLowerCase()) ?? null);
              } else {
                setSelectedBrand(text);
              }
            }}
          />
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {filterText &&
              !filteredBrands.some(
                (brand) => brand.toLowerCase() === filterText.toLowerCase()
              ) && (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => setSelectedBrand(filterText)}
                >
                  <Ionicons
                    name={
                      selectedBrand?.toLowerCase() === filterText.toLowerCase()
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
            {filteredBrands.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.option}
                onPress={() => setSelectedBrand(item)}
              >
                <Ionicons
                  name={
                    selectedBrand?.toLowerCase() === item.toLowerCase()
                      ? "checkbox"
                      : "square-outline"
                  }
                  size={24}
                  color={COLORS.primary}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.optionText}>{item}</Text>
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
              text="Confirmar Marca"
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
