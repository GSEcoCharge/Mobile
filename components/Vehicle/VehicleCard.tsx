import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "@/constants/COLORS";
import TEXT_STYLES from "@/constants/TEXT_STYLES";

interface VehicleCardProps {
  vehicle: {
    id: string;
    type: string;
    brand: string;
    model: string;
    licensePlate?: string;
    batteryCapacity: number;
    totalRange: number;
    createdAt: string;
  };
  onEdit: (vehicle: VehicleCardProps["vehicle"]) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onEdit }) => {
  return (
    <View style={styles.vehicleCard}>
      <Text style={styles.vehicleBrand}>{vehicle.brand}</Text>
      <View style={styles.vehicleInfoRow}>
        <Text style={styles.vehicleModel}>{vehicle.model}</Text>
        <Text style={styles.vehicleLicense}>
          {vehicle.licensePlate || "Sem placa"}
        </Text>
      </View>
      <View style={styles.vehicleDetailsRow}>
        <View style={styles.vehicleSpecs}>
          <Ionicons name="flash" size={16} color={COLORS.primary} />
          <Text style={styles.vehicleText}>{vehicle.type}</Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.vehicleText}>{vehicle.batteryCapacity} kWh</Text>
        </View>
        <TouchableOpacity onPress={() => onEdit(vehicle)}>
          <Text style={styles.editButton}>Editar &gt;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  vehicleCard: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.subtleLight,
    backgroundColor: COLORS.white,
    marginBottom: 8,
  },
  vehicleBrand: {
    ...TEXT_STYLES.headline_small,
  },
  vehicleInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  vehicleModel: {
    ...TEXT_STYLES.headline_medium,
  },
  vehicleLicense: {
    ...TEXT_STYLES.body_medium,
    color: COLORS.subtleDark,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: COLORS.surface,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  vehicleDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  vehicleSpecs: {
    flexDirection: "row",
    alignItems: "center",
  },
  vehicleText: {
    ...TEXT_STYLES.body_medium,
    color: COLORS.subtleDark,
    marginHorizontal: 4,
  },
  separator: {
    ...TEXT_STYLES.body_medium,
    color: COLORS.subtleDark,
  },
  editButton: {
    ...TEXT_STYLES.body_medium,
    color: COLORS.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
  },
});

export default VehicleCard;
