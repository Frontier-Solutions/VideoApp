import { StyleSheet, View, Text, ScrollView } from "react-native";

import ClipItem from "./ClipItem";
import { useEffect, useState } from "react";

function ClipList({ clips, onSelect, focused }) {
  const [clipsData, setClipsData] = useState([]);
  let currentItemIndex = 0;

  useEffect(() => {
    window.addEventListener("keydown", handleKeyEvent);

    if (clips) {
      clips[currentItemIndex].focused = true;
      setClipsData(clips);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
    };
  }, [focused]);

  function handleKeyEvent(event) {
    const { key } = event;

    console.log(key);
    if (focused === true) {
      if (key == "ArrowDown" && currentItemIndex < clipsData.length - 1) {
        currentItemIndex += 1;
      } else if (key == "ArrowUp" && currentItemIndex > 0) {
        currentItemIndex -= 1;
      } else if (key == "Enter") {
        clipsData[currentItemIndex];

        return;
      } else {
        return;
      }

      setClipsData((oldData) => {
        for (let clip of oldData) {
          clip.focused = false;
        }

        oldData[currentItemIndex].focused = true;
        return [...oldData];
      });
    }
  }

  if (!clipsData) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Loading Clips...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={focused ? styles.focused : {}}
      nestedScrollEnabled={true}
      focused={focused}
    >
      {clipsData.map((item) => (
        <ClipItem key={Math.random()} clip={item} onSelect={onSelect} />
      ))}
    </ScrollView>
  );
}

export default ClipList;

const styles = StyleSheet.create({
  unFocused: {
    borderColor: "#ffffff",
    borderWidth: 5,
    borderRadius: 18,
  },
  focused: {
    borderColor: "#fa1111",
    backgroundColor: "#000000",
    borderWidth: 5,
    borderRadius: 18,
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
