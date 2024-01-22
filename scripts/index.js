// IMPORT
import { audioPlayer } from './audioplayer.js'
import { searchAlbum } from './searchAlbumQuery.js'


// UTILITY

const updatePlayBar = function (trackObj) {
    document.getElementById('playBar').appendChild(audioPlayer(trackObj))
}

const start = function () {
    searchAlbum("Die Antwoord").then(arrayRitorno => {
        document.getElementById('titoloHeaderTrack').textContent = arrayRitorno[0].title
        document.getElementById('artistHeaderTrack').textContent = arrayRitorno[0].artist.name
        document.getElementById('ascolta').textContent = arrayRitorno[0].artist.name
        document.getElementById('recordType').textContent = arrayRitorno[0].album.type
        document.getElementById('imgHeroTrack').src = arrayRitorno[0].album.cover_medium
        updatePlayBar(arrayRitorno[0])

    }).catch(err => {
        console.error(err)
    })

}

// INIZIO ESECUZIONE VERA E PROPRIA
start()