import { FlatList, StyleSheet, View, Text, ScrollView } from "react-native";

import ClipItem from "./ClipItem";

function ClipList({ clips, onSelect }) {
  if (!clips) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Loading Clips...</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={clips}
      renderItem={({ item }) => <ClipItem clip={item} onSelect={onSelect} />}
    />
  );
}

export default ClipList;

const styles = StyleSheet.create({
  list: {
    alignSelf: "flex-start",
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
  },
});
