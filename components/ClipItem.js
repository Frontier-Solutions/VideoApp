import { Pressable, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function ClipItem({ clip, onSelect }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onSelect.bind(this, clip)}
    >
      <View style={styles.metaContainer}>
        <Text style={styles.title}>{clip.title}</Text>
        <Text style={styles.description}>{clip.description}</Text>
        <Text style={styles.date}>{clip.date}</Text>
      </View>

      <Ionicons
        style={styles.icon}
        name='play-outline'
        size={24}
        color='black'
      />
    </Pressable>
  );
}

export default ClipItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#fa1111",
    maxWidth: 500,
  },
  pressed: {
    opacity: 0.8,
  },
  metaContainer: {
    padding: 6,
    justifyContent: "center",
    alignItems: "flex-start",
    maxWidth: 300,
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#000000",
  },
  description: {
    fontSize: 12,
    fontFamily: "Inter-SemiBold",
    color: "#000000",
    paddingVertical: 8,
  },
  date: {
    fontSize: 10,
    fontFamily: "Inter-Light",
    color: "#000000",
  },
  icon: {
    flex: 1,
    alignSelf: "center",
  },
});
