import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { fetchVideoData } from "./util/videoContentLoader";

export default function App() {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await fetchVideoData();
      setVideoData(data);
    }
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
