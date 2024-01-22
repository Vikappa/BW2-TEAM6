class Artist {
    constructor(id, name, picture, picture_big, picture_medium, picture_small, picture_xl, tracklist, type) {
        this.id = id,
            this.name = name,
            this.picture = picture,
            this.picture_big = picture_big,
            this.picture_medium = picture_medium,
            this.picture_small = picture_small,
            this.picture_xl = picture_xl,
            this.tracklist = tracklist,
            this.type = "Artist"
    }
}

export { Artist }