import { Album } from './albumClass.js'
import { Artist } from './artistClass.js'
import { Genre } from './genreClass.js'
import { Track } from './tracksClass.js'

fetch("https://striveschool-api.herokuapp.com/api/deezer/album/182475962", { // FETCHA L'ALBUM PREFERITO DI VINCENZO
    headers: {}
})
    .then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('errore nella chiamata')
        }
    })
    .then((data) => {
        console.log(data.contributors.length)

        let contributorsArray = []

        for (let indexContributors = 0; indexContributors < data.contributors.length; indexContributors++) {
            let newContributor = {
                id: data.contributors[indexContributors].id,
                link: data.contributors[indexContributors].link,
                name: data.contributors[indexContributors].name,
                picture: data.contributors[indexContributors].picture,
                picture_big: data.contributors[indexContributors].picture_big,
                picture_medium: data.contributors[indexContributors].picture_medium,
                picture_small: data.contributors[indexContributors].picture_small,
                picture_xl: data.contributors[indexContributors].picture_xl,
                radio: data.contributors[indexContributors].radio,
                role: data.contributors[indexContributors].role,
                share: data.contributors[indexContributors].share,
                tracklist: data.contributors[indexContributors].tracklist,
                type: data.contributors[indexContributors].type
            }
            contributorsArray.push(newContributor)
        }

        let heroAlbumObj = new Album(
            data.artist, // Artist
            data.available, // Boolean
            contributorsArray, // Array di Artist
            data.cover, // URL API COVER
            data.cover_big, // URL API CDN
            data.cover_medium, // URL API CDN
            data.cover_small, // URL API CDN
            data.cover_xl, // URL API CDN
            data.duration, // Millisecondi
            data.explicit_content_cover, // Numero?
            data.explicit_content_lyrics, // Numero?
            data.explicit_lyrics, // Numero?
            data.fans, // Numero fans
            data.genre_id,
            data.genres, // Array di Genre
            data.id,
            data.label, // Etichetta discografica
            data.link, // Link Pagina deezer album
            data.md5_image,
            data.nb_tracks, // Numero tracce
            data.record_type, // Tipo di Album
            data.release_date, // Data Rilascio
            data.share, // Link per la condivisione con anteprime mobile
            data.title, // Titolo album
            data.tracklist, // Link API Deezer tracklist
            data.tracks, // Array Track
            data.upc // UPC
        );
        console.log(heroAlbumObj);
    })

    .catch((err) => {
        console.log(err)
    })