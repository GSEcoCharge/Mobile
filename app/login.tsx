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
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [generalError, setGeneralError] = useState("");

  const auth = getAuth(app);

  const handleLogin = async () => {
    let hasErrors = false;
    const newErrors = { email: "", password: "" };
    setGeneralError("");

    if (!email) {
      newErrors.email = "O campo de e-mail é obrigatório.";
      hasErrors = true;
    }
    if (!password) {
      newErrors.password = "O campo de senha é obrigatório.";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.dismissAll();
      router.replace("/(tabs)/map");
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setGeneralError("Usuário não encontrado.");
      } else if (error.code === "auth/wrong-password") {
        setGeneralError("Senha incorreta.");
      } else if (error.code === "auth/invalid-email") {
        setGeneralError("E-mail inválido.");
      } else {
        setGeneralError("Algo deu errado. Por favor, tente novamente.");
        console.error("Unhandled error during login:", error);
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
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.img}>
              <EletricCarLoginIMG />
            </View>
            <Text style={styles.title}>Login</Text>

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
    color: "#FF4D4D",
    fontSize: 12,
    marginTop: 4,
  },
});
