import { View, StyleSheet, Text, Pressable } from "react-native";

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occured!</Text>
      <Text style={[styles.text, styles.message]}>{message}</Text>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.pressed]}
        onPress={onConfirm}
      >
        <Text>Okay</Text>
      </Pressable>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#2d0689",
  },
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#3e04c3",
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
  },
  message: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
  },
});
