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
import { Ionicons } from "@expo/vector-icons";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ nome: "", email: "", password: "" });
  const [generalError, setGeneralError] = useState("");

  const auth = getAuth();

  const handleRegister = async () => {
    let hasErrors = false;
    const newErrors = { nome: "", email: "", password: "" };
    setGeneralError("");

    if (!nome) {
      newErrors.nome = "O campo de nome é obrigatório.";
      hasErrors = true;
    }

    if (!email) {
      newErrors.email = "O campo de e-mail é obrigatório.";
      hasErrors = true;
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Email inválido.";
        hasErrors = true;
      }
    }

    if (!password) {
      newErrors.password = "O campo de senha é obrigatório.";
      hasErrors = true;
    } else if (password.length < 6) {
      newErrors.password = "A senha deve ter no mínimo 6 caracteres.";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.dismissAll();
      router.replace({ pathname: "/(tabs)/map" });
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setGeneralError("Email já cadastrado.");
          break;
        case "auth/invalid-email":
          setGeneralError("Email inválido.");
          break;
        case "auth/operation-not-allowed":
          setGeneralError("Operação não permitida.");
          break;
        case "auth/weak-password":
          setGeneralError("Senha fraca.");
          break;
        default:
          setGeneralError("Erro desconhecido.");
          console.error(error);
      }
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

            {generalError ? (
              <View style={styles.alertContainer}>
                <Text style={styles.alertText}>{generalError}</Text>
                <Text
                  style={styles.alertClose}
                  onPress={() => setGeneralError("")}
                >
                  <Ionicons name="close" size={24} />
                </Text>
              </View>
            ) : null}

            <View style={{ gap: 24 }}>
              <View>
                <AuthInputField
                  label="Nome"
                  value={nome}
                  onChangeText={(text) => {
                    setNome(text);
                    setErrors({ ...errors, nome: "" });
                  }}
                />
                {errors.nome ? (
                  <Text style={styles.errorText}>{errors.nome}</Text>
                ) : null}
              </View>

              <View>
                <AuthInputField
                  label="Email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setErrors({ ...errors, email: "" });
                  }}
                  keyboardType="email-address"
                />
                {errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>

              <View>
                <Text style={TEXT_STYLES.label_medium}>Senha</Text>
                <AuthPasswordInput
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setErrors({ ...errors, password: "" });
                  }}
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword(!showPassword)}
                />
                {errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
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
  alertContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FEF2F2",
    borderColor: "#FCA5A5",
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: -16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
  },
  alertText: {
    color: "#B91C1C",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  alertClose: {
    color: "#B91C1C",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 12,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
  },
});
