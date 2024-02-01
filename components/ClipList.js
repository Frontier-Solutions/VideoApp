import { StyleSheet, View, Text, ScrollView } from "react-native";

import ClipItem from "./ClipItem";
import { useEffect, useRef, useState } from "react";

let currentItemIndex = 0;

function ClipList({ clips, onSelect, focused, deviceType }) {
  const scrollViewRef = useRef(null);

  const [clipsData, setClipsData] = useState([]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyEvent);

    if (clips) {
      clips[currentItemIndex].focused = true;
      setClipsData(clips);
    }
  }, [focused]);

  function handleKeyEvent(event) {
    const { key } = event;

    if (focused === true) {
      if (key == "ArrowDown" && currentItemIndex < clipsData.length - 1) {
        currentItemIndex += 1;
      } else if (key == "ArrowUp" && currentItemIndex > 0) {
        currentItemIndex -= 1;
      } else if (key == "Enter") {
        onSelect(clipsData[currentItemIndex]);
        return;
      } else {
        return;
      }

      const yScrollValue = currentItemIndex * 162; //item height + bottom margin

      scrollViewRef.current.scrollTo({
        y: yScrollValue,
        animated: true,
      });
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
      style={focused ? styles.focused : styles.unFocused}
      nestedScrollEnabled={true}
      focused={focused}
      ref={scrollViewRef}
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
