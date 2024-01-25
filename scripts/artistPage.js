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

const divSong = function (track, ntrack) {
    const maindiv = document.createElement('div')
    maindiv.classList.add('d-flex')
    maindiv.classList.add('flex-column')
    let title = document.createElement('a')
    title.classList.add('songtitle')
    title.innerText = track.title
    let album = document.createElement('a')
    album.textContent = track.album.title
    album.href = "./album.html?albumId=" + track.album.id

    maindiv.appendChild(title)
    maindiv.appendChild(album)
    return maindiv
}

const fillWithSongs = function (tracklistArtista) {
    document.getElementById('containerBrani').innerHTML = ``
    for (let index = 0; index < 10; index++) {
        document.getElementById('containerBrani').appendChild(divSong(tracklistArtista[index], index))
    }
}

const fillWithArtist = function (artista) {
    document.getElementById('nomeArtista').innerText = artista.name
    document.getElementById('verificato').innerText = artista.radio ? "Artista Verificato" : "Artista non verificato"
    document.getElementById('imgWrapper').style.backgroundImage = `url('${artista.picture_xl}')`
    searchAlbum(artista.name)
        .then((artist) => {
            fillWithSongs(artist)
            let player = audioPlayer(artist, 0)
            document.getElementById('playBar').appendChild(player)
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