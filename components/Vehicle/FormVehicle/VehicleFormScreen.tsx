import { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";
import COLORS from "@/constants/COLORS";
import TEXT_STYLES from "@/constants/TEXT_STYLES";
import VehicleTypeSelector from "@/components/Vehicle/FormVehicle/VehicleTypeSelector";
import FormInput from "@/components/Vehicle/FormVehicle/VehicleFormInput";
import ActionButton from "@/components/Vehicle/FormVehicle/VehicleActionButton";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { formatFloat } from "@/components/Utils/formatters";
import PlugsModal from "./Plugs/VehiclePlugsModal";
import PLUG_OPTIONS from "@/constants/PLUG_OPTIONS";
import PlugInput from "./Plugs/VehiclePlugInput";
import BrandSelectorModal from "./Modals/BrandSelectorModal";
import ModelSelectorModal from "./Modals/ModelSelectorModal";

interface VehicleFormScreenProps {
  returnToVehicles: () => void;
  vehicle?: {
    id: string;
    type: string;
    brand: string;
    model: string;
    plugs: string[];
    licensePlate?: string;
    batteryCapacity: number;
    totalRange: number;
  };
}

export default function VehicleFormScreen({
  returnToVehicles,
  vehicle,
}: VehicleFormScreenProps) {
  const isEditMode = !!vehicle;

  const [selectedType, setSelectedType] = useState(vehicle?.type || "");
  const [brand, setBrand] = useState(vehicle?.brand || "");
  const [model, setModel] = useState(vehicle?.model || "");
  const [licensePlate, setLicensePlate] = useState(vehicle?.licensePlate || "");
  const [batteryCapacity, setBatteryCapacity] = useState(
    vehicle?.batteryCapacity.toString() || ""
  );
  const [totalRange, setTotalRange] = useState(
    vehicle?.totalRange.toString() || ""
  );

  const [brandModalVisible, setBrandModalVisible] = useState(false);
  const [modelModalVisible, setModelModalVisible] = useState(false);
  const [plugsModalVisible, setPlugsModalVisible] = useState(false);
  const [selectedPlugs, setSelectedPlugs] = useState<PlugOption[]>(
    vehicle?.plugs
      .map((plug) => PLUG_OPTIONS.find((p) => p.id === plug))
      .filter((plug): plug is PlugOption => plug !== undefined) || []
  );

  const animation = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsVisible] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    if (selectedType) {
      setIsVisible(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsVisible(false));
    }
    // useRef animation são estáveis e não precisam ser declarados como dependências
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

  function resetForm() {
    setSelectedType(vehicle?.type || "");
    setBrand(vehicle?.brand || "");
    setModel(vehicle?.model || "");
    setSelectedPlugs([]);
    setLicensePlate(vehicle?.licensePlate || "");
    setBatteryCapacity(vehicle?.batteryCapacity.toString() || "");
    setTotalRange(vehicle?.totalRange.toString() || "");
    returnToVehicles();
  }

  const saveVehicleToDatabase = async () => {
    const missingFields: string[] = [];

    if (!selectedType) missingFields.push("Tipo do veículo");
    if (!brand) missingFields.push("Marca");
    if (!model) missingFields.push("Modelo");
    if (selectedPlugs.length === 0) missingFields.push("Plugs ou adaptadores");
    if (!batteryCapacity) missingFields.push("Capacidade da bateria");
    if (!totalRange) missingFields.push("Autonomia Total");

    if (missingFields.length > 0) {
      alert(
        `Preencha os campos obrigatórios:\n- ${missingFields.join("\n- ")}`
      );
      return;
    }

    if (licensePlate.length > 0 && licensePlate.length < 7) {
      alert("Placa inválida.");
      return;
    }

    if (!user) {
      console.error("Usuário não autenticado.");
      return;
    }

    const vehicleData = {
      type: selectedType,
      brand,
      model,
      plugs: selectedPlugs.map((plug) => plug.id),
      licensePlate: licensePlate || "",
      batteryCapacity: formatFloat(
        parseFloat(batteryCapacity.replace(",", "."))
      ),
      totalRange: formatFloat(parseFloat(totalRange.replace(",", "."))),
      updatedAt: new Date().toISOString(),
    };

    try {
      if (isEditMode) {
        const vehicleDocRef = doc(
          db,
          `users/${user.uid}/vehicles`,
          vehicle!.id
        );
        await updateDoc(vehicleDocRef, vehicleData);
      } else {
        const vehiclesCollection = collection(db, `users/${user.uid}/vehicles`);
        await addDoc(vehiclesCollection, {
          ...vehicleData,
          createdAt: new Date().toISOString(),
        });
      }

      returnToVehicles();
    } catch (error) {
      console.error(
        isEditMode
          ? "Erro ao atualizar veículo:"
          : "Erro ao adicionar veículo:",
        error
      );
      alert("Erro ao salvar veículo.");
    }
  };

  const deleteVehicleFromDatabase = async () => {
    if (!vehicle || !user) return;

    try {
      const vehicleDocRef = doc(db, `users/${user.uid}/vehicles`, vehicle.id);
      await deleteDoc(vehicleDocRef);
      returnToVehicles();
    } catch (error) {
      console.error("Erro ao excluir veículo:", error);
      alert("Erro ao excluir veículo.");
    }
  };

  const handleLicensePlateChange = (text: string) => {
    const filteredText = text.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (/^[A-Z]{0,3}[0-9]{0,1}[A-Z0-9]{0,1}[0-9]{0,2}$/.test(filteredText)) {
      setLicensePlate(filteredText);
    }
  };

  const handleSaveBrand = (selectedBrand: string) => {
    setBrand(selectedBrand);
    setModel("");
  };

  const handleSaveModel = (selectedModel: {
    name: string;
    battery_capacity: number;
    autonomy: number;
  }) => {
    setModel(selectedModel.name);
    setBatteryCapacity(selectedModel.battery_capacity.toString());
    setTotalRange(selectedModel.autonomy.toString());
  };
  const handleSavePlugs = (plugs: PlugOption[]) => {
    setSelectedPlugs(plugs);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        {/* TODO: Maintain or remove go back button */}
        {/* {!isEditMode && (
          <TouchableOpacity
            onPress={returnToVehicles}
            style={styles.goBackButton}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            <Text style={styles.goBackText}>Voltar</Text>
          </TouchableOpacity>
        )} */}
        <Text style={TEXT_STYLES.headline_small}>
          {isEditMode ? "Editar veículo" : "Adicionar novo veículo"}
        </Text>
        <VehicleTypeSelector
          selectedType={selectedType}
          onSelect={setSelectedType}
        />
        {isVisible && (
          <Animated.View
            style={[
              styles.formContainer,
              {
                opacity: animation,
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Marca do veículo</Text>
              <TouchableOpacity
                onPress={() => setBrandModalVisible(true)}
                style={styles.inputContainer}
              >
                <Text style={styles.inputText}>{brand}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Modelo do veículo</Text>
              <TouchableOpacity
                onPress={() => setModelModalVisible(true)}
                style={styles.inputContainer}
              >
                <Text style={styles.inputText}>{model}</Text>
              </TouchableOpacity>
            </View>
            <PlugInput
              selectedPlugs={selectedPlugs}
              onEditPlugs={() => setPlugsModalVisible(true)}
            />
            <FormInput
              label="Placa (opcional)"
              value={licensePlate}
              onChangeText={(text) => handleLicensePlateChange(text)}
              keyboardType="visible-password"
              maxLength={7}
              width={120}
            />
            <FormInput
              label="Capacidade da bateria (kWh)"
              value={batteryCapacity}
              onChangeText={setBatteryCapacity}
              keyboardType="numeric"
              onlyDigits
            />
            <FormInput
              label="Autonomia Total (km)"
              value={totalRange}
              onChangeText={setTotalRange}
              keyboardType="numeric"
              onlyDigits
            />
            <View style={styles.actionContainer}>
              <ActionButton
                text="Cancelar"
                isPrimary={false}
                onPress={resetForm}
              />
              <ActionButton
                text={isEditMode ? "Salvar alterações" : "Adicionar veículo"}
                isPrimary
                onPress={saveVehicleToDatabase}
              />
            </View>
            {isEditMode && (
              <View style={styles.deleteContainer}>
                <Text
                  style={styles.deleteText}
                  onPress={deleteVehicleFromDatabase}
                >
                  Excluir Veículo
                </Text>
                <Ionicons name="trash-outline" size={20} color={COLORS.error} />
              </View>
            )}
          </Animated.View>
        )}
      </View>
      <BrandSelectorModal
        visible={brandModalVisible}
        onClose={() => setBrandModalVisible(false)}
        onSave={handleSaveBrand}
      />
      <ModelSelectorModal
        visible={modelModalVisible}
        onClose={() => setModelModalVisible(false)}
        selectedBrand={brand}
        onSave={handleSaveModel}
      />
      <PlugsModal
        visible={plugsModalVisible}
        onClose={() => setPlugsModalVisible(false)}
        onSave={handleSavePlugs}
        initialSelectedPlugs={selectedPlugs}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
    width: "100%",
  },
  container: {
    width: "100%",
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
    backgroundColor: COLORS.white,
    gap: 16,
  },
  inputContainer: {
    width: "100%",
    gap: 8,
  },
  inputText: {
    ...TEXT_STYLES.body_large,
    color: COLORS.normal,
    fontFamily: "WorkSans_500Medium",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.subtleLight,
  },
  label: {
    ...TEXT_STYLES.label_large,
    color: COLORS.normal,
    fontFamily: "WorkSans_500Medium",
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    gap: 16,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginVertical: 16,
    marginBottom: 32,
  },
  deleteContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
    marginTop: -24,
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.error,
    paddingBottom: 4,
  },
  deleteText: {
    ...TEXT_STYLES.body_large,
    fontFamily: "WorkSans_600SemiBold",
    color: COLORS.error,
    textAlign: "center",
    fontSize: 16,
  },
  goBackButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  goBackText: {
    ...TEXT_STYLES.body_large,
    marginLeft: 8,
    color: COLORS.primary,
    fontSize: 16,
  },
});
