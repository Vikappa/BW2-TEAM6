// IMPORT
import { catchAlbum } from './fetchAlbumObg.js'
import { searchAlbum } from './searchAlbumQuery.js'


// UTILITY

const updatePlayBar = function () {
    const playerControls = document.createElement('div')
    const backIcon = document.createElement('i')
    const nextIcon = document.createElement('i')
    const playIcon = document.createElement('i')

    playIcon.innerHTML = `<i class="bi bi-play-circle-fill text-primary p-0 m-0" style="font-size:2rem;"></i>`
    backIcon.innerHTML = `<i class="bi bi-play-circle-fill text-primary p-0 m-0" style="font-size:4.5rem;"></i>`
    nextIcon.innerHTML = `<i class="bi bi-skip-forward-fill text-primary p-0 m-0" style="font-size:2rem;"></i>`
    document.getElementById('playBar').appendChild(playerControls)
}

const start = function () {
    searchAlbum("Post Humans Survival Horror").then(arrayRitorno => {
        document.getElementById('titoloHeaderTrack').textContent = arrayRitorno[0].title
        document.getElementById('artistHeaderTrack').textContent = arrayRitorno[0].artist.name
        document.getElementById('ascolta').textContent = arrayRitorno[0].artist.name
        document.getElementById('recordType').textContent = arrayRitorno[0].album.type
        document.getElementById('imgHeroTrack').src = arrayRitorno[0].album.cover_medium

        updatePlayBar(arrayRitorno[0].preview)

    }).catch(err => {
        console.error(err)
    })

}

// INIZIO ESECUZIONE VERA E PROPRIA
start()