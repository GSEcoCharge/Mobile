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
