import EletricCarResetIMG from "@/assets/svg/eletric-car-reset";
import ImagePlaceholder from "@/assets/svg/imagePlaceholder";
import AuthActionButton from "@/components/Auth/AuthActionButton";
import AuthInputField from "@/components/Auth/AuthInputField";
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

  const handleResetPassword = async () => {
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
          <Text style={styles.description}>
            Por favor, insira seu e-mail para as instruções de recuperação de
            senha.
          </Text>
        </View>
        <AuthInputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <View style={styles.actionButtonsContainer}>
          <AuthActionButton text="Enviar" onPress={handleResetPassword} />
          <View>
            <Pressable onPress={() => router.back()}>
              <Text style={styles.backButton}>Voltar</Text>
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
  description: {
    ...textStyles.label_large,
    color: colors.subtleDark,
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 12,
  },
  img: {
    width: 290.4,
    height: 264,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonsContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  },
  backButton: {
    ...textStyles.headline_small,
    color: colors.primary,
    fontSize: 18,
  },
});
