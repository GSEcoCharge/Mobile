import PictorialIcon from "@/assets/svg/pictorial";
import EletricCarHomeIMG from "@/assets/svg/eletric-car-home";
import EletricCarHomeDetailIMG from "@/assets/svg/eletric-car-home-detail";
import colors from "@/constants/Colors";
import textStyles from "@/constants/TextStyles";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ alignItems: "center", gap: 16 }}>
          <View style={{ gap: 24, alignItems: "center" }}>
            <PictorialIcon width={304} height={144} />
            <Text
              style={[textStyles.display_medium, { color: colors.primary }]}
            >
              ECOCHARGE
            </Text>
          </View>
          <Text
            style={[
              textStyles.body_large,
              {
                fontFamily: "WorkSans_500Medium",
                color: colors.normal,
                textAlign: "center",
              },
            ]}
          >
            Descubra carregadores próximos, planeje rotas eficientes e
            impulsione a mobilidade sustentável
          </Text>
        </View>
        <View style={{ alignItems: "center", gap: 24 }}>
          {/* <Link href={"/(tabs)/Map"}> */}
          <Link href={"/register"}>
            <View
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 16,
                borderRadius: 16,
                width: 320,
              }}
            >
              <Text
                style={[
                  textStyles.label_large,
                  { color: colors.white, textAlign: "center" },
                ]}
              >
                REGISTRE-SE
              </Text>
            </View>
          </Link>
          <Link href={"/login"}>
            <View
              style={{
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.primary,
                paddingVertical: 16,
                borderRadius: 16,
                width: 320,
              }}
            >
              <Text
                style={[
                  textStyles.label_large,
                  { color: colors.black, textAlign: "center" },
                ]}
              >
                LOGIN
              </Text>
            </View>
          </Link>
        </View>
        <Text
          style={[
            textStyles.label_small,
            { color: colors.subtleDark, textAlign: "center", marginTop: -16 },
          ]}
        >
          Ao criar sua conta, você concorda com nossos{" "}
          <Text style={{ color: colors.primary }}>Termos de Uso</Text> e{" "}
          <Text style={{ color: colors.primary }}>Política de Privacidade</Text>
        </Text>
        {/* TODO: REMOVE DEBUG */}
        <Link href={"/(tabs)/map"} style={{ color: "red" }}>
          Debug
        </Link>
      </View>
      <View style={styles.backgroundContainer}>
        {/* <EletricCarHomeDetailIMG width={460} height={230} /> */}
        <EletricCarHomeIMG width={320} height={168} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 40,
    marginHorizontal: 32,
    marginTop: 64,
  },
  backgroundContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scaleX: -1 }],
  },
});
