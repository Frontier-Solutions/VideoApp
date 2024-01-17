import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { fetchVideoData } from "./util/videoContentLoader";
import ClipList from "./components/ClipList";
import Player from "./components/Player";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/Inter-Black.otf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.otf"),
    "Inter-Light": require("./assets/fonts/Inter-Light.otf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.otf"),
  });

  const [videoData, setVideoData] = useState();
  const [currentClipData, setcurrentClipData] = useState(null);

  useEffect(() => {
    async function getData() {
      const data = await fetchVideoData();
      setVideoData(data);

      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    getData();
  }, [fontsLoaded]);

  function onClipSelected(clip) {
    setcurrentClipData(clip);
  }

  return (
    <>
      <StatusBar style='auto' />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {videoData ? videoData.video.title : "Loading Title"}
          </Text>
          <Text style={styles.description}>
            {videoData ? videoData.video.description : "Loading Description"}
          </Text>
        </View>

        <View style={styles.mainContentContainer}>
          <View style={styles.listContainer}>
            <ClipList
              clips={videoData && videoData.videoClips}
              onSelect={onClipSelected}
            />
          </View>

          <View style={styles.videoContainer}>
            <Player clip={currentClipData} />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
  },
  titleContainer: {
    width: "100%",
    padding: 8,
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    backgroundColor: "#000000",
  },
  mainContentContainer: {
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
  },
  listContainer: {
    maxHeight: 570,
  },
  videoContainer: {},
  title: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    color: "#ffff",
  },
  description: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold",
    color: "#ffff",
  },
});
