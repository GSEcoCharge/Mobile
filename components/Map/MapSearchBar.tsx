import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Crypto from "expo-crypto";
import MapView from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";
import textStyles from "@/constants/TextStyles";
import { LocationObjectCoords } from "expo-location";

interface SearchBarProps {
  mapRef: React.RefObject<MapView>;
  location: LocationObjectCoords;
}

const MapSearchBar: React.FC<SearchBarProps> = ({ mapRef, location }) => {
  const [sessionToken, setSessionToken] = useState<string>("");
  const [chosenPlace, setChosenPlace] = useState<any | null>(null);
  const [placeholder, setPlaceholder] = useState<string>("Pesquise aqui");
  const [placeholderColor, setPlaceholderColor] = useState<string>("#555");
  const [autocompleteKey, setAutocompleteKey] = useState<string>("initial");

  const searchRef = useRef<any>(null);

  useEffect(() => {
    generateSessionToken();
  }, []);

  const generateSessionToken = async () => {
    const UUID = Crypto.randomUUID();
    setSessionToken(UUID);
  };

  const clearInput = () => {
    setChosenPlace(null);
    searchRef.current?.clear();
    setAutocompleteKey(Crypto.randomUUID());
    generateSessionToken();
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        key={autocompleteKey}
        ref={searchRef}
        minLength={3}
        renderRightButton={() =>
          chosenPlace ? (
            <Pressable style={styles.iconContainer} onPress={clearInput}>
              <Ionicons name="close" size={24} color="#555" />
            </Pressable>
          ) : (
            <></>
          )
        }
        renderLeftButton={() =>
          !chosenPlace ? (
            <View style={styles.iconContainer}>
              <Ionicons name="search" size={24} color="#555" />
            </View>
          ) : (
            <></>
          )
        }
        placeholder={placeholder}
        fetchDetails={true}
        onPress={(data, details = null) => {
          if (details) {
            setChosenPlace(details);
            console.log(data);
            console.log(details);

            const { lat, lng } = details.geometry.location;
            mapRef.current?.animateToRegion({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
          }
        }}
        enablePoweredByContainer={false}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
          language: "pt-BR",
          sessiontoken: sessionToken,
          components: "country:br",
          location: `${location.latitude},${location.longitude}`,
          radius: 10000,
        }}
        GooglePlacesDetailsQuery={{
          fields: "geometry",
        }}
        styles={{
          container: styles.inputContainer,
          textInput: styles.input,
          listView: styles.listView,
          row: styles.row,
          separator: styles.separator,
        }}
        textInputProps={{
          numberOfLines: 1,
          ellipsizeMode: "tail",
          onFocus: () => {
            setPlaceholder("Nome do local ou endereço");
            setPlaceholderColor("#888");
          },
          onBlur: () => {
            setPlaceholder("Pesquisar endereço");
            setPlaceholderColor("#555");
          },
          placeholderTextColor: placeholderColor,
        }}
        onFail={(error) => console.error(error)}
        debounce={400}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    width: "90%",
    alignSelf: "center",
    zIndex: 1,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    paddingHorizontal: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    ...textStyles.body_large,
    color: "#555",
    height: "100%",
    flex: 1,
    paddingRight: 10,
  },
  listView: {
    borderRadius: 10,
    overflow: "hidden",
  },
  row: {
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  separator: {
    height: 0.5,
    backgroundColor: "#ddd",
  },
});

export default MapSearchBar;
