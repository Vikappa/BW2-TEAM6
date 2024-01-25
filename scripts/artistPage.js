import { Album } from './albumClass.js'
import { Artist } from './artistClass.js'
import { Genre } from './genreClass.js'
import { Track } from './tracksClass.js'
import { catchArtist } from './fetchArtistObg.js'
import { searchAlbum } from './searchAlbumQuery.js'
import { audioPlayer } from './audioplayer.js'

const addressBar = new URLSearchParams(location.search)
const albumId = addressBar.get("artistId")
let currentArtist = {}

const fillWithSongs = function (tracklistArtista) {
    for (let index = 0; index < 10; index++) {

    }
}

const fillWithArtist = function (artista) {
    document.getElementById('nomeArtista').innerText = artista.name
    document.getElementById('verificato').innerText = artista.radio ? "Artista Verificato" : "Artista non verificato"
    document.getElementById('imgWrapper').style.backgroundImage = `url('${artista.picture_xl}')`
    searchAlbum(artista.name)
        .then((artist) => {
            console.log(artist)
            fillWithSongs(artist)
            let player = audioPlayer(artist, 0)
            document.getElementById('containerPlayer').appendChild(player)
            console.log(player)
        })
        .catch((err) => {
            console.log(err)
        })
}


catchArtist(albumId)
    .then((data) => {
        currentArtist = data
        fillWithArtist(currentArtist)
    })
    .catch((err) => {
        console.log(err)
    })