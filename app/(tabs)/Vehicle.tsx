import { useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import COLORS from "@/constants/COLORS";
import TEXT_STYLES from "@/constants/TEXT_STYLES";
import VehicleTypeSelector from "@/components/Vehicle/VehicleTypeSelector";
import FormInput from "@/components/Vehicle/VehicleFormInput";
import ActionButton from "@/components/Vehicle/VehicleActionButton";
import { router } from "expo-router";

export default function VehicleScreen() {
  const [selectedType, setSelectedType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [totalRange, setTotalRange] = useState("");

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        width: "100%",
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        <Text style={TEXT_STYLES.headline_small}>Adicionar novo veículo</Text>
        <VehicleTypeSelector
          selectedType={selectedType}
          onSelect={setSelectedType}
        />
        <FormInput
          label="Marca do veículo"
          value={brand}
          onChangeText={setBrand}
        />
        <FormInput
          label="Modelo do veículo"
          value={model}
          onChangeText={setModel}
        />
        <FormInput
          label="Placa (opcional)"
          value={licensePlate}
          onChangeText={setLicensePlate}
        />
        <FormInput
          label="Capacidade da bateria (kWh)"
          value={batteryCapacity}
          onChangeText={setBatteryCapacity}
          keyboardType="numeric"
        />
        <FormInput
          label="Autonomia Total (km)"
          value={totalRange}
          onChangeText={setTotalRange}
          keyboardType="numeric"
        />
        <View style={styles.actionContainer}>
          <ActionButton
            text="Cancelar"
            isPrimary={false}
            onPress={() => {
              router.back();
            }}
          />
          <ActionButton
            text="Adicionar novo veículo"
            isPrimary
            onPress={() => {}}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    paddingTop: 72,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    gap: 16,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 16,
    marginBottom: 32,
  },
});
