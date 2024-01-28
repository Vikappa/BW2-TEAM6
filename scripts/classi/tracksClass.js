class Track {
    constructor(album, artist, duration, explicit_content_cover, explicit_content_lyrics, explicit_lyrics, id, link, md5_image, preview, rank, readable, title, title_short, title_version) {
        this.album = album;
        this.artist = artist;
        this.duration = duration;
        this.explicit_content_cover = explicit_content_cover;
        this.explicit_content_lyrics = explicit_content_lyrics;
        this.explicit_lyrics = explicit_lyrics;
        this.id = id;
        this.link = link;
        this.md5_image = md5_image;
        this.preview = preview;
        this.rank = rank;
        this.readable = readable;
        this.title = title;
        this.title_short = title_short;
        this.title_version = title_version;
        this.type = "track";
    }
}

export { Track }
