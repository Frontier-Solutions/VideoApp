import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, PanResponder } from "react-native";

function ProgressBar({ durationMillis, progressMillis, onPositionChanged }) {
  const [progress, setProgress] = useState(0);
  const [computedWidth, setComputedWidth] = useState(0);
  const [computedXPos, setComputedXPos] = useState(0);
  const [clickPosition, setClickPosition] = useState();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        setClickPosition(gestureState.x0);
      },
    })
  ).current;

  const durationSeconds = durationMillis / 1000;

  useEffect(() => {
    if (progressMillis) {
      const progressSeconds = progressMillis / 1000;
      const percent = progressSeconds / durationSeconds;
      const progressBarWidth = percent * computedWidth;

      setProgress(progressBarWidth);
    }
  }, [progressMillis]);

  useEffect(() => {
    const barPosition = clickPosition - computedXPos;
    const percent = barPosition / computedWidth;
    const videoPosition = percent * durationMillis;

    onPositionChanged(videoPosition);
  }, [clickPosition]);

  function getWidth(event) {
    const { width, left } = event.nativeEvent.layout;

    setComputedWidth(width);
    setComputedXPos(left);
  }

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={styles.backgroundBar} onLayout={getWidth}>
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
