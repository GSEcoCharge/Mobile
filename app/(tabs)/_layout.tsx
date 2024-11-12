import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import colors from '@/constants/Colors';
import { textStyles } from '@/constants/TextStyles';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Map':
              iconName = focused ? 'map' : 'map-outline';
              break;
            case 'TripPlanner':
              iconName = focused ? 'navigate-circle' : 'navigate-circle-outline';
              break;
            case 'Vehicle':
              iconName = focused ? 'car-sport' : 'car-sport-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
            default:
              iconName = 'ellipse-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#f8f8f8',
          borderTopWidth: 0,
          elevation: 5,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          ...textStyles.label_small,
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      })}
    >
      <Tabs.Screen
        name="Map"
        options={{
          title: 'Mapa',
        }}
      />
      <Tabs.Screen
        name="TripPlanner"
        options={{
          title: 'Viagens',
        }}
      />
      <Tabs.Screen
        name="Vehicle"
        options={{
          title: 'Veículos',
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Perfil',
        }}
      />
    </Tabs>
  );
}
