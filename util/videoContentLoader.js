import { XMLParser } from "fast-xml-parser";

import { Video, VideoClip } from "../models/videoModels";

export async function fetchVideoData() {
  const url = "http://rss.cnn.com/services/podcasting/studentnews/rss.xml";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch video data!");
  }

  const videoData = {
    video: {},
    videoClips: [],
  };

  const responseText = await response.text();
  const parser = new XMLParser();
  const jObj = parser.parse(responseText).rss.channel;

  videoData.video = new Video(jObj.title, jObj.description, jObj.copyright);

  const items = jObj.item;

  for (const item of items) {
    videoData.videoClips.push(
      new VideoClip(
        item.title,
        item.description,
        item.link,
        item["dc:creator"],
        item.category,
        item.pubDate
      )
    );
  }

  console.log(videoData);

  return videoData;
}
