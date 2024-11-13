import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/constants/Colors";
import textStyles from "@/constants/TextStyles";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Map":
              iconName = focused ? "map" : "map-outline";
              break;
            case "TripPlanner":
              iconName = focused
                ? "navigate-circle"
                : "navigate-circle-outline";
              break;
            case "Vehicle":
              iconName = focused ? "car-sport" : "car-sport-outline";
              break;
            case "Profile":
              iconName = focused ? "person-circle" : "person-circle-outline";
              break;
            default:
              iconName = "ellipse-outline";
              break;
          }

          return <Ionicons name={iconName} size={28} color={color} />;
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 5,
          height: 64,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          ...textStyles.label_medium,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      })}
    >
      <Tabs.Screen
        name="Map"
        options={{
          title: "Mapa",
        }}
      />
      <Tabs.Screen
        name="TripPlanner"
        options={{
          title: "Viagens",
        }}
      />
      <Tabs.Screen
        name="Vehicle"
        options={{
          title: "Veículos",
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Perfil",
        }}
      />
    </Tabs>
  );
}
