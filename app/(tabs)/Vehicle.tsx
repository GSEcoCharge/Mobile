import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import COLORS from "@/constants/COLORS";
import TEXT_STYLES from "@/constants/TEXT_STYLES";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import VehicleFormScreen from "@/components/Vehicle/FormVehicle/VehicleFormScreen";
import VehicleCard from "@/components/Vehicle/VehicleCard";
import { Ionicons } from "@expo/vector-icons";

export default function VehicleScreen() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddVehicleScreen, setShowAddVehicleScreen] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState<Vehicle | undefined>(
    undefined
  );

  const user = auth.currentUser;

  const fetchVehicles = useCallback(async () => {
    if (!user) return;

    setLoading(true);

    try {
      const vehiclesRef = collection(db, `users/${user.uid}/vehicles`);
      const querySnapshot = await getDocs(vehiclesRef);
      const userVehicles: Vehicle[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        type: doc.data().type,
        brand: doc.data().brand,
        model: doc.data().model,
        plugs: doc.data().plugs,
        licensePlate: doc.data().licensePlate,
        batteryCapacity: doc.data().batteryCapacity,
        totalRange: doc.data().totalRange,
        createdAt: doc.data().createdAt,
      }));
      setVehicles(userVehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleEditVehicle = (vehicle: Vehicle) => {
    setVehicleToEdit(vehicle);
    setShowAddVehicleScreen(true);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (showAddVehicleScreen || vehicles.length === 0) {
    return (
      <VehicleFormScreen
        returnToVehicles={() => {
          setShowAddVehicleScreen(false);
          setVehicleToEdit(undefined);
          fetchVehicles();
        }}
        vehicle={vehicleToEdit}
      />
    );
  }

  return (
    <FlatList
      data={vehicles}
      keyExtractor={(item: Vehicle) => item.id}
      renderItem={({ item }) => (
        <VehicleCard vehicle={item} onEdit={handleEditVehicle} />
      )}
      ListHeaderComponent={() => (
        <Text style={styles.header}>Meus Veículos</Text>
      )}
      contentContainerStyle={styles.container}
      ListFooterComponent={() => (
        <>
          <View style={styles.footerSpacing} />

          <View
            style={[styles.button, { backgroundColor: COLORS.primary }]}
            onTouchStart={() => setShowAddVehicleScreen(true)}
          >
            <Ionicons name="add" size={24} color={COLORS.white} />
            <Text
              style={[
                TEXT_STYLES.title_medium,
                { color: COLORS.white, fontSize: 18 },
              ]}
            >
              Adicionar veículo
            </Text>
          </View>
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    gap: 4,
  },
  header: {
    ...TEXT_STYLES.headline_small,
    marginTop: 48,
    marginBottom: 16,
  },
  footerSpacing: {
    height: 16,
  },
  button: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
