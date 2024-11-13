import HideEye from "@/assets/icons/hide_eye";
import ImagePlaceholder from "@/assets/icons/imagePlaceholder";
import ShowEye from "@/assets/icons/show_eye";
import colors from "@/constants/Colors";
import textStyles from "@/constants/TextStyles";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { app } from "@/firebaseConfig";
import { Auth, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, router } from "expo-router";

import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  const auth = getAuth(app);

  const handleAuth = async (auth: Auth, email: string, password: string) => {
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }
    try {
      setEmail(email.trim());
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        setIsLogin(true);
        router.replace("/(tabs)/Map");
      }
    } catch (error) {
      console.log(error);
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
            <View style={styles.placeholder}>
              <ImagePlaceholder
                color={colors.subtleDark}
                width={24}
                height={24}
              />
            </View>
            <Text
              style={{
                fontFamily: "WorkSans_600SemiBold",
                color: colors.normal,
                fontSize: 40,
                lineHeight: 48,
              }}
            >
              Login
            </Text>
            <View style={{ gap: 24 }}>
              <View style={{ gap: 8 }}>
                <Text style={textStyles.label_medium}>Email</Text>
                <TextInput
                  selectionColor={colors.primary}
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
                />
              </View>
              <View style={{ gap: 8 }}>
                <Text style={textStyles.label_medium}>Senha</Text>
                <View>
                  <TextInput
                    selectionColor={colors.primary}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry={!showPassword}
                  />
                  <Pressable
                    style={{ position: "absolute", right: 16, top: 12 }}
                    onPress={handleShowPassword}
                  >
                    {showPassword ? (
                      <HideEye color={colors.subtleDark} />
                    ) : (
                      <ShowEye color={colors.subtleDark} />
                    )}
                  </Pressable>
                </View>
                <View style={{ alignSelf: "flex-start" }}>
                  <Link href={"/resetPassword"} style={{ paddingVertical: 8 }}>
                    <Text
                      style={[textStyles.label_small, { color: "#7C7D81" }]}
                    >
                      Esqueceu a senha?
                    </Text>
                  </Link>
                </View>
              </View>
            </View>
            <Pressable onPress={() => handleAuth(auth, email, password)}>
              <View
                style={{
                  width: 320,
                  height: 48,
                  borderRadius: 8,
                  backgroundColor: colors.primary,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={[textStyles.headline_small, { color: colors.white }]}
                >
                  Entrar
                </Text>
              </View>
            </Pressable>
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
  placeholder: {
    width: 304,
    height: 200,
    backgroundColor: colors.background,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.subtleLight,
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
