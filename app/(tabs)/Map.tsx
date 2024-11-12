import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Region } from "react-native-maps";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import GPSButton from "@/components/Map/GPSButton";
import SearchBar from "@/components/Map/SearchBar";

const MapScreen: React.FC = () => {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const enabled = await Location.hasServicesEnabledAsync();
      if (status !== "granted" || !enabled) {
        setLocation({
          accuracy: 12.697999954223633,
          altitude: 781.5999755859375,
          altitudeAccuracy: 4.191502571105957,
          heading: 0,
          latitude: -23.5304678,
          longitude: -46.5771891,
          speed: 0,
        });
        setErrorMsg("Location permission denied or services disabled");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const initialRegion: Region = {
    latitude: location?.latitude || 0,
    longitude: location?.longitude || 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
      />
      <SearchBar mapRef={mapRef} />
      <GPSButton mapRef={mapRef} setLocation={setLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
