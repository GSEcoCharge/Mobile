import React, { useEffect, useState } from "react";
import { StyleSheet, Pressable, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import * as Location from "expo-location";

interface GPSButtonProps {
  mapRef: React.RefObject<MapView>;
  setLocation: React.Dispatch<
    React.SetStateAction<Location.LocationObjectCoords | null>
  >;
}

const GPSButton: React.FC<GPSButtonProps> = ({ mapRef, setLocation }) => {
  const [GPSColor, setGPSColor] = useState("#ea4335");
  const [bgColor, setBgColor] = useState("#fff");

  useEffect(() => {
    (async () => {
      const enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        setGPSColor("#ea4335");
        return;
      }
      setGPSColor("#000");
    })();
  }, []);

  const handlePress = async () => {
    try {
      const enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        setGPSColor("#ea4335");
        Alert.alert(
          "Ative os Serviços de Localização",
          "Para usar esta funcionalidade, você precisa ativar os serviços de localização."
        );
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão Negada",
          "Permita o acesso à localização para usar esta funcionalidade."
        );
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      setGPSColor("#000");

      mapRef.current?.animateToRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível obter a localização.");
    }
  };

  return (
    <Pressable
      style={[styles.button, { backgroundColor: bgColor }]}
      onPress={handlePress}
      onPressIn={() => setBgColor("#e0e0e0")}
      onPressOut={() => setBgColor("#fff")}
    >
      <Ionicons name="locate" size={28} color={GPSColor} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    right: 20,
    padding: 14,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GPSButton;
