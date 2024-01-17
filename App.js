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

  const [isLoading, setIsLoading] = useState(true);
  const [videoData, setVideoData] = useState();
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);

  useEffect(() => {
    async function getData() {
      const data = await fetchVideoData();
      setVideoData(data);

      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        setIsLoading(false);
      }
    }

    getData();
  }, [fontsLoaded]);

  function onClipSelected(url) {
    setCurrentVideoUrl(url);
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
          <ClipList
            clips={videoData && videoData.videoClips}
            onSelect={onClipSelected}
          />
          <Player videoUrl={currentVideoUrl} />
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
    padding: 8,
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    backgroundColor: "#000000",
  },
  mainContentContainer: {
    flexDirection: "row",
  },
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
