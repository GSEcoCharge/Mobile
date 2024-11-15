import React, { useState, useEffect, useRef } from "react";
import { Image, StyleSheet, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { getLocation } from "@/components/Map/locationUtils";
import LoadingScreen from "@/components/Utils/screens/LoadingScreen";
import MapGPSButton from "@/components/Map/MapGPSButton";
import MapSearchBar from "@/components/Map/MapSearchBar";
import * as Location from "expo-location";
import evStationsData from "@/components/Utils/api/ev_stations.json";

interface LocationCoords {
  latitude: number;
  longitude: number;
}

interface EVStation {
  formattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  displayName: {
    text: string;
    languageCode: string;
  };
  evChargeOptions?: {
    connectorCount: number;
    connectorAggregation: Array<{
      type: string;
      count: number;
      maxChargeRateKw?: number;
      availableCount?: number;
      outOfServiceCount?: number;
      availabilityLastUpdateTime?: string;
    }>;
  };
}

const isDebugMode = true;

const MapScreen: React.FC = () => {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [evStations, setEvStations] = useState<EVStation[]>([]);
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

  const fetchEVStations = async (location: LocationCoords) => {
    const latitude = location.latitude;
    const longitude = location.longitude;
    const radius = 1000;

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
              title={station.displayName.text}
              description={station.formattedAddress}
              image={require("@/assets/images/marker.png")}
            />
          ))}
      </MapView>
      <MapSearchBar mapRef={mapRef} location={location} />
      <MapGPSButton mapRef={mapRef} setLocation={setLocation} />
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
