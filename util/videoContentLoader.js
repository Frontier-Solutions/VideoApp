import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";

import { Video, VideoClip } from "../models/videoModels";

export async function fetchVideoData() {
  const url = "http://rss.cnn.com/services/podcasting/studentnews/rss.xml";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch video data!");
  }

  const responseText = await response.text();
  const parser = new XMLParser();
  const jObj = parser.parse(responseText);

  console.log(jObj.rss);

  // for (const child of children) {
  //   console.log();
  // }

  const videoData = {
    video: {},
    videoClips: [],
  };
}
