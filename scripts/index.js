// IMPORT
import { audioPlayer } from './audioplayer.js'
import { searchAlbum } from './searchAlbumQuery.js'


// UTILITY

const updatePlayBar = function (trackObj) {
    console.log('prova')
    document.getElementById('playBar').innerHTML = ``
    document.getElementById('playBar').appendChild(audioPlayer(trackObj))
}

const start = function () {
    searchAlbum("Banana Brain").then(arrayRitorno => {
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

document.getElementById("Vincenzos").addEventListener('click', () => {
    searchAlbum("Mantra Bring Me The Horizon").then(arrayRitorno => {
        document.getElementById('titoloHeaderTrack').textContent = arrayRitorno[0].title
        document.getElementById('artistHeaderTrack').textContent = arrayRitorno[0].artist.name
        document.getElementById('ascolta').textContent = arrayRitorno[0].artist.name
        document.getElementById('recordType').textContent = arrayRitorno[0].album.type
        document.getElementById('imgHeroTrack').src = arrayRitorno[0].album.cover_medium
        updatePlayBar(arrayRitorno[0])

    }).catch(err => {
        console.error(err)
    })
})