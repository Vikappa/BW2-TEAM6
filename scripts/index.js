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
        console.log(data)
    }
    )
    .catch((err) => {
        console.log(err)
    })