class Album {
    constructor(artist, available, contributors = [], cover, cover_big,
        cover_medium, cover_small, cover_xl, duration, explicit_content_cover,
        explicit_content_lyrics, explicit_lyrics, fans, genre_id, genres, id, label,
        link, md5_image, nb_tracks, record_type, release_date, share, title, tracklist,
        tracks, type, upc) {

        this.artist = artist // Artist
        this.available = available // Boolean
        this.contributors = contributors // Array di Artist
        this.cover = cover // URL API COVER
        this.cover_big = cover_big // URL API CDN
        this.cover_medium = cover_medium // URL API CDN
        this.cover_small = cover_small // URL API CDN
        this.cover_xl = cover_xl // URL API CDN
        this.duration = duration //Millisecondi
        this.explicit_content_cover = explicit_content_cover // Numero?
        this.explicit_content_lyrics = explicit_content_lyrics// Numero?
        this.explicit_lyrics = explicit_lyrics// Numero?
        this.fans = fans // Numero fans
        this.genre_id = genre_id
        this.genres = genres // Array di Genre
        this.id = id
        this.label = label // Etichetta discografica
        this.link = link // Link Pagina deezer album
        this.md5_image = md5_image // ??
        this.nb_tracks = nb_tracks // Numero tracce
        this.record_type = record_type // Tipo di Album
        this.release_date = release_date // Data Rilascio
        this.share = share // Link per la condivisione con anteprime mobile
        this.title = title // Titolo album
        this.tracklist = tracklist // Link API Deezer tracklist
        this.tracks = tracks // Array Track
        this.type = type // Tipo
        this.upc = upc // ???
    }
}

export { Album }
