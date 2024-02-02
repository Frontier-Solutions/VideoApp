import { Pressable, StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function ClipItem({ clip, onSelect, onClickTap }) {
  return (
    <Pressable
      id='clipItem'
      style={({ pressed }) => [
        styles.item,
        pressed && styles.pressed,
        clip.focused ? styles.focused : styles.unfocused,
      ]}
      onPress={() => {
        clip.focused = true;
        onClickTap(clip.key);
        onSelect(clip);
      }}
    >
      <View style={styles.metaContainer}>
        <Text style={styles.title}>{clip.title}</Text>
        <Text style={styles.description}>{clip.description}</Text>
        <Text style={styles.date}>{clip.date}</Text>
      </View>

      <Ionicons
        style={styles.icon}
        name='play-outline'
        size={36}
        color='black'
      />
    </Pressable>
  );
}

export default ClipItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 12,
    marginBottom: 12,
    width: 365,
    height: 150,
  },
  focused: {
    backgroundColor: "#fb7e7e",
  },
  unfocused: {
    backgroundColor: "#fa1111",
  },
  pressed: {
    opacity: 0.8,
  },
  metaContainer: {
    padding: 6,
    justifyContent: "center",
    alignItems: "flex-start",
    maxWidth: 200,
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
    alignSelf: "center",
  },
});
