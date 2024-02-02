import { StyleSheet, View, Text, ScrollView } from "react-native";

import ClipItem from "./ClipItem";
import { useEffect, useRef, useState } from "react";

let currentItemIndex = 0;

function ClipList({ clips, onSelect, focused }) {
  const scrollViewRef = useRef(null);

  const [clipsData, setClipsData] = useState([]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyEvent);

    if (clips) {
      setClipsData(() => {
        if (focused == true) {
          clips[currentItemIndex].focused = true;
        }

        return [...clips];
      });
    }

    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
    };
  }, [focused]);

  function onClickTap(clipKey) {
    currentItemIndex = clipKey;
    scrollToItem();
    setClipsData((clips) => {
      for (let clip of clips) {
        clip.focused = false;
      }

      clips[clipKey].focused = true;
      return [...clips];
    });
  }

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

      scrollToItem();
      setClipsData((clips) => {
        for (let clip of clips) {
          clip.focused = false;
        }

        clips[currentItemIndex].focused = true;
        return [...clips];
      });
    }
  }

  function scrollToItem() {
    const yScrollValue = currentItemIndex * 162; //item height + bottom margin

    scrollViewRef.current.scrollTo({
      y: yScrollValue,
      animated: true,
    });
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
      style={[
        styles.listContainer,
        focused ? styles.focused : styles.unFocused,
      ]}
      nestedScrollEnabled={true}
      focused={focused}
      ref={scrollViewRef}
    >
      {clipsData.map((item) => (
        <ClipItem
          key={item.key}
          clip={item}
          onSelect={onSelect}
          onClickTap={onClickTap}
        />
      ))}
    </ScrollView>
  );
}

export default ClipList;

const styles = StyleSheet.create({
  listContainer: {
    maxHeight: 638,
    margin: 24,
  },
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
