export class Video {
  constructor(title, description, copyright) {
    this.title = title;
    this.description = description;
    this.copyright = copyright;
  }
}

export class VideoClip {
  constructor(key, title, description, videoUrl, author, category, date) {
    this.key = key;
    this.title = title;
    this.description = description;
    this.videoUrl = videoUrl;
    this.author = author;
    this.category = category;
    this.date = date;
    this.focused = false;
  }
}
