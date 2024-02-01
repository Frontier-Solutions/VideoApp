import { Video } from "expo-av";
import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useEffect, useRef } from "react";

import { getPlayerStyle } from "../components/UI/StyleHelper";

function Player({ clip, deviceType, focused }) {
  const video = useRef(null);

  const playerSize = {
    width: getPlayerStyle(deviceType).width,
    height: getPlayerStyle(deviceType).height,
  };

  useEffect(() => {
    clip && video.current.playAsync();
  }, [clip]);

  return (
    <View id='videoView' style={focused ? styles.focused : styles.unfocused}>
      <Video
        useNativeControls={true}
        ref={video}
        style={[styles.video, playerSize]}
        source={{ uri: clip && clip.videoUrl }}
        videoStyle={playerSize}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {clip ? clip.description : "Pick a clip!"}
        </Text>
      </View>
    </View>
  );
}

export default Player;

const styles = StyleSheet.create({
  unfocused: {
    borderColor: "#ffffff",
    borderWidth: 5,
    borderRadius: 18,
  },
  focused: {
    borderColor: "#fa1111",
    borderWidth: 5,
    borderRadius: 18,
  },
  video: {
    margin: 24,
    borderRadius: 12,
  },
  textContainer: {
    width: "100%",
    maxHeight: 150,
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
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
