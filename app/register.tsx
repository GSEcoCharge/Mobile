import COLORS from "@/constants/COLORS";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import EletricCarRegisterIMG from "@/assets/svg/eletric-car-register";
import AuthPasswordInput from "@/components/Auth/AuthPasswordInput";
import AuthInputField from "@/components/Auth/AuthInputField";
import AuthActionButton from "@/components/Auth/AuthActionButton";
import TEXT_STYLES from "@/constants/TEXT_STYLES";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const auth = getAuth();

  const handleRegister = async () => {
    if (!nome || !email || !password) {
      alert("Preencha todos os campos");
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert("Email inválido");
      return;
    }
    if (password.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.dismissAll();
      router.replace({ pathname: "/(tabs)/map" });
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("Email já cadastrado");
          break;
        case "auth/invalid-email":
          alert("Email inválido");
          break;
        case "auth/operation-not-allowed":
          alert("Operação não permitida");
          break;
        case "auth/weak-password":
          alert("Senha fraca");
          break;
        default:
          alert("Erro desconhecido");
          console.error(error);
      }
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
          contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.img}>
              <EletricCarRegisterIMG />
            </View>
            <Text style={styles.title}>Registre-se</Text>
            <View style={{ gap: 24 }}>
              <AuthInputField
                label="Nome"
                value={nome}
                onChangeText={setNome}
              />
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
              </View>
            </View>
            <AuthActionButton text="Registrar" onPress={handleRegister} />
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
  },
  img: {
    width: 304,
    height: 176,
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
