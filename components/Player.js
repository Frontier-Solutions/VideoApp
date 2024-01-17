import { Video, ResizeMode } from "expo-av";
import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

function Player({ clip }) {
  const video = React.useRef(null);

  React.useEffect(() => {
    clip && video.current.playAsync();
  }, [clip]);

  return (
    <View style={styles.container}>
      <Video
        useNativeControls={true}
        ref={video}
        style={styles.video}
        source={{ uri: clip && clip.videoUrl }}
        resizeMode={ResizeMode.CONTAIN}
        videoStyle={{
          width: 1280,
          height: 720,
        }}
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
  container: {
    maxWidth: 1280,
  },
  video: {
    width: 1280,
    height: 720,
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
