import COLORS from "@/constants/COLORS";
import TEXT_STYLES from "@/constants/TEXT_STYLES";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getAuth, signOut } from "firebase/auth";

export default function ProfileScreen() {
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Link push href="/" asChild>
        <Pressable style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    padding: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    ...TEXT_STYLES.headline_small,
  },
});
