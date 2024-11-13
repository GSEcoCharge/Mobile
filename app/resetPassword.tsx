import EletricCarResetIMG from "@/assets/icons/eletric-car-reset";
import ImagePlaceholder from "@/assets/icons/imagePlaceholder";
import colors from "@/constants/Colors";
import textStyles from "@/constants/TextStyles";
import { auth } from "@/firebaseConfig";
import { router } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const AsyncAlert = (title: string, msg: string | undefined) =>
    new Promise((resolve) => {
      Alert.alert(
        title,
        msg,
        [
          {
            text: "ok",
            onPress: () => {
              resolve("YES");
            },
          },
        ],
        { cancelable: false }
      );
    });

  const handleResetPassword = async (email: any) => {
    try {
      await sendPasswordResetEmail(auth, email);
      Keyboard.dismiss();
      await AsyncAlert("Alerta", "Email enviado com sucesso!");
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.container}>
        <View style={styles.img}>
          <EletricCarResetIMG />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.title}>Esqueceu sua Senha?</Text>
          <Text
            style={[
              textStyles.label_large,
              {
                color: colors.subtleDark,
                textAlign: "center",
                marginTop: 12,
                marginHorizontal: 20,
              },
            ]}
          >
            Por favor, insira seu e-mail para as instruções de recuperação de
            senha.
          </Text>
        </View>
        <View style={{ gap: 8 }}>
          <Text style={textStyles.label_medium}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <Pressable
            style={{
              width: 320,
              height: 48,
              borderRadius: 8,
              backgroundColor: colors.primary,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => handleResetPassword(email)}
          >
            <Text style={[textStyles.headline_small, { color: "white" }]}>
              Enviar
            </Text>
          </Pressable>
          <View>
            <Pressable onPress={() => router.back()}>
              <Text
                style={[
                  textStyles.headline_small,
                  { color: colors.primary, fontSize: 18 },
                ]}
              >
                Voltar
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: colors.white,
    marginHorizontal: 24,
    marginTop: 72,
    gap: 40,
  },
  title: {
    fontFamily: "WorkSans_600SemiBold",
    fontSize: 30,
  },
  img: {
    width: 290.4,
    height: 264,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 320,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.subtleLight,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
