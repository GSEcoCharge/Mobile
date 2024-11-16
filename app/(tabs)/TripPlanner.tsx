import COLORS from "@/constants/COLORS";
import TEXT_STYLES from "@/constants/TEXT_STYLES";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "@/firebaseConfig";
import { router } from "expo-router";
import EletricCarRepairIMG from "@/assets/svg/eletric-car-repair";

export default function TabOneScreen() {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.replace("/(tabs)/map");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.container}>
        <View style={styles.img}>
          <EletricCarRepairIMG />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.title}>Desculpas</Text>
          <Text style={styles.title}>Em manunteção</Text>
          <Text
            style={[
              TEXT_STYLES.label_large,
              {
                color: COLORS.subtleDark,
                textAlign: "center",
                marginTop: 12,
                marginHorizontal: 20,
              },
            ]}
          >
            Perdão, a página está em manutenção Tente novamente mais tarde
          </Text>
        </View>
        <Pressable
          style={{
            padding: 12,
            backgroundColor: COLORS.primary,
            borderRadius: 10,
          }}
          onPress={handleLogout}
        >
          <Text style={[TEXT_STYLES.headline_small, { color: "white" }]}>
            VOLTAR AO MAPA
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.white,
    justifyContent: "center",
    marginHorizontal: 24,
    gap: 40,
  },
  title: {
    fontFamily: "WorkSans_600SemiBold",
    fontSize: 30,
  },
  img: {
    width: 264,
    height: 264,
    justifyContent: "center",
    alignItems: "center",
  },
});
