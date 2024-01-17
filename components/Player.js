import { Video } from "expo-av";
import * as React from "react";
import { StyleSheet, View } from "react-native";

function Player({ videoUrl }) {
  const video = React.useRef(null);

  React.useEffect(() => {
    videoUrl && video.current.playAsync();
  }, [videoUrl]);

  return (
    <View style={styles.playerContainer}>
      <Video
        useNativeControls={true}
        ref={video}
        style={styles.video}
        source={{ uri: videoUrl }}
        resizeMode='stretch'
      />
    </View>
  );
}

export default Player;

const styles = StyleSheet.create({
  video: {
    width: 1280,
    height: 720,
    margin: 24,
  },
});
