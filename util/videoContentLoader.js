import axios from "axios";
import { XMLParser } from "fast-xml-parser";

import { Video, VideoClip } from "../models/videoModels";

export async function fetchVideoData() {
  const url = "http://rss.cnn.com/services/podcasting/studentnews/rss.xml";

  try {
    const response = await axios.get(url);
    const videoData = parseClips(response.data);
    return videoData;
  } catch (error) {
    throw new Error("Failed to fetch video data!");
  }
}

async function parseClips(response) {
  const videoData = {
    video: {},
    videoClips: [],
  };

  const parser = new XMLParser();
  const jObj = parser.parse(response).rss.channel;

  videoData.video = new Video(jObj.title, jObj.description, jObj.copyright);

  const items = jObj.item;

  let key = 0;
  for (const item of items) {
    videoData.videoClips.push(
      new VideoClip(
        (item.key = key),
        item.title,
        item.description,
        item.link,
        item["dc:creator"],
        item.category,
        item.pubDate
      )
    );

    key++;
  }

  return videoData;
}
