class Artist {
    constructor(id, link, name, nb_album, nb_fan, picture, picture_big, picture_medium, picture_small, picture_xl, radio, share, trackList, type) {
        this.id = id;
        this.link = link; // Aggiunto questo campo
        this.name = name;
        this.nb_album = nb_album;
        this.nb_fan = nb_fan;
        this.picture = picture;
        this.picture_big = picture_big;
        this.picture_medium = picture_medium;
        this.picture_small = picture_small;
        this.picture_xl = picture_xl;
        this.radio = radio;
        this.share = share;
        this.trackList = trackList; // Modificato il nome per corrispondere al parametro passato
        this.type = type;
    }
}


export { Artist }