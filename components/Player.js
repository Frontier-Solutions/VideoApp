import { Video, ResizeMode } from "expo-av";
import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useEffect, useRef, forwardRef } from "react";

import { getPlayerStyle } from "../components/UI/StyleHelper";

const Player = forwardRef(({ clip, deviceType }, ref) => {
  const video = useRef(null);

  useEffect(() => {
    clip && video.current.playAsync();
  }, [clip]);

  return (
    <View style={{ width: getPlayerStyle(deviceType).width }} ref={ref}>
      <Video
        useNativeControls={true}
        ref={video}
        style={{
          ...styles.video,
          width: getPlayerStyle(deviceType).width,
          height: getPlayerStyle(deviceType).height,
        }}
        source={{ uri: clip && clip.videoUrl }}
        resizeMode={ResizeMode.CONTAIN}
        videoStyle={{
          width: getPlayerStyle(deviceType).width,
          height: getPlayerStyle(deviceType).height,
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {clip ? clip.description : "Pick a clip!"}
        </Text>
      </View>
    </View>
  );
});

export default Player;

const styles = StyleSheet.create({
  video: {
    margin: 24,
    borderRadius: 12,
  },
  textContainer: {
    width: "100%",
    maxHeight: 150,
    borderRadius: 12,
    marginLeft: 24,
    backgroundColor: "#fa1111",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    padding: 6,
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#000000",
  },
});
