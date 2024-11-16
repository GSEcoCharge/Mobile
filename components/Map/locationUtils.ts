import * as Location from "expo-location";

export const defaultLocation = {
  accuracy: 12.697999954223633,
  altitude: 781.5999755859375,
  altitudeAccuracy: 4.191502571105957,
  heading: 0,
  latitude: -23.5304678,
  longitude: -46.5771891,
  speed: 0,
};

async function handleLocationPermissionError(
  text: string,
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>,
  setLocation: React.Dispatch<
    React.SetStateAction<Location.LocationObjectCoords | null>
  >
) {
  setErrorMsg(text);
  const lastLoc = await Location.getLastKnownPositionAsync({});
  setLocation(lastLoc?.coords || defaultLocation);
}

export async function getLocation(
  setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>,
  setLocation: React.Dispatch<
    React.SetStateAction<Location.LocationObjectCoords | null>
  >
) {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    handleLocationPermissionError("Permissão negada", setErrorMsg, setLocation);
    return;
  }

  const enabled = await Location.hasServicesEnabledAsync();
  if (!enabled) {
    handleLocationPermissionError(
      "Serviços de localização desativados",
      setErrorMsg,
      setLocation
    );
    return;
  }

  const loc = await Location.getCurrentPositionAsync({});
  setLocation(loc.coords);
}

// Haversine Formula
export const calculateDistanceKM = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): string => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceInKm = R * c;

  if (distanceInKm < 1) {
    return `${Math.round(distanceInKm * 1000)}m`.replace(".", ",");
  }

  return `${distanceInKm.toFixed(2)}km`.replace(".", ",");
};
