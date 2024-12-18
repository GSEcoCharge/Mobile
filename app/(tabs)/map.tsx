import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { getLocation } from "@/components/Map/locationUtils";
import LoadingScreen from "@/components/Utils/screens/LoadingScreen";
import MapGPSButton from "@/components/Map/MapGPSButton";
import MapSearchBar from "@/components/Map/MapSearchBar";
import * as Location from "expo-location";
import evStationsData from "@/components/Utils/api/ev_stations.json";
import MapCalloutBox from "@/components/Map/MapCallout";

const isDebugMode = true;

export default function MapScreen() {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [, setErrorMsg] = useState<string | null>(null);
  const [evStations, setEvStations] = useState<EVStation[]>([]);
  const [selectedStation, setSelectedStation] = useState<EVStation | null>(
    null
  );
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    getLocation(setErrorMsg, setLocation);
  }, []);

  useEffect(() => {
    if (location) {
      if (isDebugMode) {
        loadMockData();
      } else {
        fetchEVStations(location);
      }
    }
  }, [location]);

  const loadMockData = async () => {
    try {
      setEvStations(evStationsData.places);
    } catch (error) {
      console.error("Error loading mock EV station data:", error);
    }
  };

  const fetchEVStations = async (
    location: LocationCoords | null,
    customLatitude?: number,
    customLongitude?: number
  ) => {
    const latitude = customLatitude || location?.latitude;
    const longitude = customLongitude || location?.longitude;

    if (!latitude || !longitude) {
      console.error("Latitude and Longitude are required");
      return;
    }

    const radius = 2500;

    const url = "https://places.googleapis.com/v1/places:searchNearby";
    const headers = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY || "",
      "X-Goog-FieldMask":
        "places.displayName,places.formattedAddress,places.location,places.evChargeOptions",
    };
    const requestData = {
      locationRestriction: {
        circle: {
          center: { latitude, longitude },
          radius,
        },
      },
      includedTypes: ["electric_vehicle_charging_station"],
      languageCode: "pt-BR",
      rankPreference: "DISTANCE",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      setEvStations(data.places || []);
    } catch (error) {
      console.error("Error fetching EV stations:", error);
    }
  };

  const initialRegion: Region = {
    latitude: location?.latitude || 0,
    longitude: location?.longitude || 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  if (!location) return <LoadingScreen />;

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >
        {evStations.length > 0 &&
          evStations.map((station, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: station.location.latitude,
                longitude: station.location.longitude,
              }}
              image={require("@/assets/images/marker.png")}
              onPress={() => setSelectedStation(station)}
            />
          ))}
      </MapView>
      <MapSearchBar
        mapRef={mapRef}
        location={location}
        fetchEVStations={fetchEVStations}
      />
      <MapGPSButton mapRef={mapRef} setLocation={setLocation} />
      {selectedStation && (
        <MapCalloutBox
          station={selectedStation}
          onClose={() => setSelectedStation(null)}
          userLocation={location}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
