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
    <ScrollView style={styles.scrollView}>
      <FlatList
        style={styles.list}
        data={clips}
        renderItem={({ item }) => <ClipItem clip={item} onSelect={onSelect} />}
      />
    </ScrollView>
  );
}

export default ClipList;

const styles = StyleSheet.create({
  scrollView: {
    overflow: "hidden",
  },
  list: {
    margin: 24,
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
