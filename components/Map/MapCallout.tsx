import COLORS from "@/constants/COLORS";
import CONNECTOR_TYPE from "@/constants/CONNECTOR_TYPE";
import TEXT_STYLES from "@/constants/TEXT_STYLES";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  ScrollView,
} from "react-native";
import { LocationObjectCoords } from "expo-location";
import { calculateDistanceKM } from "./locationUtils";

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

interface CalloutBoxProps {
  station: EVStation;
  onClose: () => void;
  userLocation: LocationObjectCoords;
}

export default function MapCalloutBox({
  station,
  onClose,
  userLocation,
}: CalloutBoxProps) {
  const openInNavigationApp = (app: "google" | "waze") => {
    const { latitude, longitude } = station.location;

    if (app === "google") {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
      Linking.openURL(url).catch(() => {
        Alert.alert("Erro", "Não foi possível abrir o Google Maps.");
      });
    } else if (app === "waze") {
      const url = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
      Linking.openURL(url).catch(() => {
        Alert.alert("Erro", "Não foi possível abrir o Waze.");
      });
    }
  };

  const formatNumber = (num: number) => {
    let number = Math.round(num * 100) / 100;
    return number.toString().replace(".", ",");
  };

  const distance = calculateDistanceKM(
    userLocation.latitude,
    userLocation.longitude,
    station.location.latitude,
    station.location.longitude
  );

  return (
    <View style={styles.calloutBoxContainer}>
      <View style={styles.calloutBox}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.titleScroll}
          >
            <Text style={styles.calloutTitle}>{station.displayName.text}</Text>
          </ScrollView>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={COLORS.subtleDark} />
          </TouchableOpacity>
        </View>
        <Text style={styles.calloutAddress}>{station.formattedAddress}</Text>
        <View style={{ gap: 4 }}>
          <View style={styles.separator} />
          {station.evChargeOptions && (
            <View style={styles.detailsContainer}>
              <View style={styles.iconWithText}>
                <Ionicons name="cog-outline" size={20} color={COLORS.normal} />
                <Text style={styles.detailsLabel}>Conectores:</Text>
              </View>
              <Text style={styles.detailsValue}>
                {station.evChargeOptions.connectorCount}
              </Text>
            </View>
          )}
          {station.evChargeOptions?.connectorAggregation &&
            station.evChargeOptions.connectorAggregation.length > 0 && (
              <>
                {station.evChargeOptions.connectorAggregation[0]
                  .availableCount !== undefined && (
                  <View style={styles.detailsContainer}>
                    <View style={styles.iconWithText}>
                      <Ionicons
                        name="pulse-outline"
                        size={20}
                        color={COLORS.normal}
                      />
                      <Text style={styles.detailsLabel}>Status:</Text>
                    </View>
                    <View style={styles.statusWithCircle}>
                      <View
                        style={[
                          styles.statusIndicator,
                          {
                            backgroundColor:
                              station.evChargeOptions.connectorAggregation[0]
                                .availableCount === 0
                                ? COLORS.error
                                : COLORS.primary
                          },
                        ]}
                      />
                      <Text style={styles.detailsValue}>
                        {station.evChargeOptions.connectorAggregation[0]
                          .availableCount === 0
                          ? "Indisponível"
                          : "Disponível"}
                      </Text>
                    </View>
                  </View>
                )}

                {station.evChargeOptions.connectorAggregation[0].type && (
                  <View style={styles.detailsContainer}>
                    <View style={styles.iconWithText}>
                      <MaterialCommunityIcons
                        name="power-plug-outline"
                        size={20}
                        color={COLORS.normal}
                      />
                      <Text style={styles.detailsLabel}>Plugs:</Text>
                    </View>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                    >
                      {station.evChargeOptions.connectorAggregation.map(
                        (connector, index) => (
                          <View key={index} style={styles.plugItem}>
                            <Text
                              style={[styles.detailsValue, { color: "red" }]}
                            >
                              {
                                CONNECTOR_TYPE[
                                  connector.type as keyof typeof CONNECTOR_TYPE
                                ]
                              }
                            </Text>
                          </View>
                        )
                      )}
                    </ScrollView>
                  </View>
                )}
                {station.evChargeOptions.connectorAggregation[0]
                  .maxChargeRateKw && (
                  <View style={styles.detailsContainer}>
                    <View style={styles.iconWithText}>
                      <Ionicons
                        name="flash-outline"
                        size={20}
                        color={COLORS.normal}
                      />
                      <Text style={styles.detailsLabel}>Potência:</Text>
                    </View>
                    <Text style={styles.detailsValue}>
                      {formatNumber(
                        station.evChargeOptions.connectorAggregation[0]
                          .maxChargeRateKw
                      )}
                      kW
                    </Text>
                  </View>
                )}
              </>
            )}
          <View style={styles.detailsContainer}>
            <View style={styles.iconWithText}>
              <Ionicons
                name="location-outline"
                size={20}
                color={COLORS.normal}
              />
              <Text style={styles.detailsLabel}>Distância:</Text>
            </View>
            <Text style={styles.detailsValue}>{distance}</Text>
          </View>
        </View>
      </View>
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => openInNavigationApp("google")}
        >
          <Text style={styles.navButtonText}>Google Maps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => openInNavigationApp("waze")}
        >
          <Text style={styles.navButtonText}>Waze</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calloutBoxContainer: {
    overflow: "hidden",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 10,
    backgroundColor: COLORS.surface,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    gap: 4,
  },
  calloutBox: {
    padding: 16,
    paddingBottom: 8,
    gap: 4,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  titleScroll: {
    flex: 1,
    marginRight: 10,
  },
  calloutTitle: {
    ...TEXT_STYLES.title_medium,
    fontWeight: "bold",
  },
  calloutAddress: {
    ...TEXT_STYLES.label_medium,
    color: COLORS.subtleDark,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusWithCircle: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  detailsLabel: {
    ...TEXT_STYLES.label_medium,
    fontFamily: "WorkSans_600SemiBold",
    color: COLORS.normal,
    width: 120,
  },
  detailsValue: {
    ...TEXT_STYLES.label_medium,
    fontFamily: "WorkSans_600SemiBold",
    color: COLORS.black,
    flex: 1,
  },
  plugItem: {
    backgroundColor: "#ececec",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 24,
    marginRight: 10,
  },
  separator: {
    borderBottomColor: COLORS.background,
    borderBottomWidth: 2,
    marginVertical: 8,
    marginBottom: 4,
  },
  navigationButtons: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderColor: COLORS.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
    gap: 10,
  },
  navButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    alignItems: "center",
  },
  navButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
