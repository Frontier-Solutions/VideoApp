import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, PanResponder } from "react-native";

function ProgressBar({ durationMillis, progressMillis, onPositionChanged }) {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        // console.log(gestureState.x0 - computedXPos);
        console.log(computedXPos);
      },
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
    })
  ).current;

  const [progress, setProgress] = useState(0);
  const [computedWidth, setComputedWidth] = useState(0);
  const [computedXPos, setComputedXPos] = useState(0);

  const durationSeconds = durationMillis / 1000;

  useEffect(() => {
    if (progressMillis) {
      const progressSeconds = progressMillis / 1000;
      const percent = progressSeconds / durationSeconds;
      const progressBarWidth = percent * computedWidth;

      setProgress(progressBarWidth);
    }
  }, [progressMillis]);

  function getWidth(event) {
    const { width, left } = event.nativeEvent.layout;

    console.log(left);

    setComputedWidth(width);
    setComputedXPos(left);
  }

  return (
    <View
      style={styles.container}
      onLayout={getWidth}
      {...panResponder.panHandlers}
    >
      <View style={styles.backgroundBar}>
        <View style={[styles.progressBar, { width: progress }]}></View>
      </View>
      <View style={styles.pointer}></View>
    </View>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
  },
  backgroundBar: {
    height: 10,
    backgroundColor: "#2d0000",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressBar: {
    backgroundColor: "#c20000",
    height: 10,
  },
  pointer: {},
});
