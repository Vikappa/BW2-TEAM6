class PlayList {
    constructor(nome, trackarray, img = "") {
        this.nome = nome,
            this.trackarray = trackarray
        this.img = img
        if (img === "") {
            this.img = trackarray[0].album.cover_medium
        }
    }
}

export { PlayList }