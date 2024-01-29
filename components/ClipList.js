import { StyleSheet, View, Text, ScrollView } from "react-native";
import { forwardRef } from "react";

import ClipItem from "./ClipItem";

const ClipList = forwardRef(({ clips, onSelect }, ref) => {
  if (!clips) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Loading Clips...</Text>
      </View>
    );
  }

  return (
    <ScrollView nestedScrollEnabled={true}>
      {clips.map((item) => (
        <ClipItem
          key={Math.random()}
          clip={item}
          onSelect={onSelect}
          ref={ref}
        />
      ))}
    </ScrollView>
  );
});

export default ClipList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
  },
});
