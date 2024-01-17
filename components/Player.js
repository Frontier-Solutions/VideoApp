import { Video, ResizeMode } from "expo-av";
import * as React from "react";
import { StyleSheet } from "react-native";

function Player({ videoUrl }) {
  const video = React.useRef(null);

  React.useEffect(() => {
    videoUrl && video.current.playAsync();
  }, [videoUrl]);

  return (
    <Video
      useNativeControls={true}
      ref={video}
      style={styles.video}
      source={{ uri: videoUrl }}
      resizeMode={ResizeMode.CONTAIN}
      videoStyle={{
        width: 1280,
        height: 720,
      }}
    />
  );
}

export default Player;

const styles = StyleSheet.create({
  video: {
    width: 1280,
    height: 720,
    margin: 24,
    borderRadius: 12,
  },
});
