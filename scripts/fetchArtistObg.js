import { Album } from './albumClass.js'
import { Artist } from './artistClass.js'
import { Genre } from './genreClass.js'
import { Track } from './tracksClass.js'


const catchArtist = function (queryArtistID) {
    return fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + queryArtistID, {
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
            let id = data.id
            let link = data.link
            let name = data.name
            let nb_album = data.nb_album
            let nb_fan = data.nb_fan
            let picture = data.picture
            let picture_big = data.picture_big
            let picture_medium = data.picture_medium
            let picture_small = data.picture_small
            let picture_xl = data.picture_xl
            let radio = data.radio
            let share = data.share
            let trackList = data.trackList
            let type = data.type
            let newArtist = new Artist(id, link, name, nb_album, nb_fan, picture, picture_big, picture_medium, picture_small, picture_xl, radio, share, trackList, type)
            return newArtist
        })
        .catch((err) => {
            console.log(err)
        })

}

export { catchArtist }

