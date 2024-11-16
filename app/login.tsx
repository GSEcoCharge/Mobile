import COLORS from "@/constants/COLORS";
import TEXT_STYLES from "@/constants/TEXT_STYLES";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { app } from "@/firebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, router } from "expo-router";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import EletricCarLoginIMG from "@/assets/svg/eletric-car-login";
import AuthInputField from "@/components/Auth/AuthInputField";
import AuthPasswordInput from "@/components/Auth/AuthPasswordInput";
import AuthActionButton from "@/components/Auth/AuthActionButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const auth = getAuth(app);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.dismissAll();
      router.replace("/(tabs)/map");
    } catch (error) {
      alert("Erro ao autenticar");
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.img}>
              <EletricCarLoginIMG />
            </View>
            <Text style={styles.title}>Login</Text>
            <View style={{ gap: 24 }}>
              <AuthInputField
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <View style={{ gap: 8 }}>
                <Text style={TEXT_STYLES.label_medium}>Senha</Text>
                <AuthPasswordInput
                  value={password}
                  onChangeText={setPassword}
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />
                <View style={{ alignSelf: "flex-start" }}>
                  <Link href={"/resetPassword"} style={{ paddingVertical: 8 }}>
                    <Text
                      style={[TEXT_STYLES.label_small, { color: "#7C7D81" }]}
                    >
                      Esqueceu a senha?
                    </Text>
                  </Link>
                </View>
              </View>
            </View>
            <AuthActionButton text="Entrar" onPress={handleLogin} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    marginHorizontal: 32,
    marginTop: -48,
  },
  img: {
    width: 304,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "WorkSans_600SemiBold",
    color: COLORS.normal,
    fontSize: 40,
    lineHeight: 48,
  },
});
