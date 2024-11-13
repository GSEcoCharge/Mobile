import colors from "@/constants/Colors";
import textStyles from "@/constants/TextStyles";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* center button with logout that return to index */}
      <Link push href="/" asChild>
        <Pressable style={styles.button}>
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
    backgroundColor: colors.white,
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
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    ...textStyles.headline_small,
  },
});
