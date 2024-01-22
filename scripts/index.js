// IMPORT
import { catchAlbum } from './fetchAlbumObg.js'
import { searchAlbum } from './searchAlbumQuery.js'


// UTILITY
const start = function () {
    searchAlbum("Post Humans Survival Horror").then(arrayRitorno => {
        console.log(arrayRitorno[0])
        document.getElementById('titoloHeaderTrack').textContent = arrayRitorno[0].title
        document.getElementById('artistHeaderTrack').textContent = arrayRitorno[0].artist.name
        document.getElementById('ascolta').textContent = arrayRitorno[0].artist.name
        document.getElementById('recordType').textContent = arrayRitorno[0].album.type
        document.getElementById('imgHeroTrack').src = arrayRitorno[0].album.cover_medium



    }).catch(err => {
        console.error(err)
    })

}

// INIZIO ESECUZIONE VERA E PROPRIA
start()