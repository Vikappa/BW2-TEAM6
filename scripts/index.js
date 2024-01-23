// IMPORT
import { audioPlayer } from './audioplayer.js'
import { searchAlbum } from './searchAlbumQuery.js'
import { searchBar } from './searchBar.js'

// UTILITY
document.getElementById('closeRightBar').addEventListener("click", function () {
    document.getElementById('barraDestra').classList.add("closing")
})


const updatePlayBar = function (tracklist, trackIndex) {
    document.getElementById('playBar').innerHTML = ``
    document.getElementById('playBar').appendChild(audioPlayer(trackObj))
}

const updateHero = function (tracklist, ntraccia) {
    document.getElementById('titoloHeaderTrack').textContent = tracklist[ntraccia].title
    document.getElementById('artistHeaderTrack').textContent = tracklist[ntraccia].artist.name
    document.getElementById('ascolta').textContent = tracklist[ntraccia].artist.name
    document.getElementById('recordType').textContent = tracklist[ntraccia].album.type
    document.getElementById('imgHeroTrack').src = tracklist[ntraccia].album.cover_medium
}

const start = function () {
    searchAlbum("Die Antwoord").then(arrayRitorno => {
        updateHero(arrayRitorno, 0)
        // updatePlayBar(arrayRitorno[0])
        document.getElementById("cercaAnchor").addEventListener('click', () => {
            document.getElementById("cercaAnchor").remove()
            document.getElementById('cercaLi').appendChild(searchBar())
        })
    }).catch(err => {
        console.error(err)
    })

}

// INIZIO ESECUZIONE VERA E PROPRIA
start()

document.getElementById("Vincenzos").addEventListener('click', () => {


    searchAlbum("Mantra Bring Me The Horizon").then(arrayRitorno => {
        updateHero(arrayRitorno, 0)
        // updatePlayBar(arrayRitorno[0])
    }).catch(err => {
        console.error(err)
    })
})

document.getElementById("Ermias").addEventListener('click', () => {
    searchAlbum("Kung fu fighting").then(arrayRitorno => {
        updateHero(arrayRitorno, 0)
        // updatePlayBar(arrayRitorno[0])
    }).catch(err => {
        console.error(err)
    })
})

document.getElementById("Fabios").addEventListener('click', () => {
    searchAlbum("Californication Red Hot").then(arrayRitorno => {
        updateHero(arrayRitorno, 0)
    }).catch(err => {
        console.error(err)
    })
})

document.getElementById("Giuseppes").addEventListener('click', () => {
    searchAlbum("Highway hell ACDC").then(arrayRitorno => {
        updateHero(arrayRitorno, 0)
        // updatePlayBar(arrayRitorno[0])
    }).catch(err => {
        console.error(err)
    })
})


document.getElementById("Francescos").addEventListener('click', () => {
    searchAlbum("Body parts Marracash").then(arrayRitorno => {
        updateHero(arrayRitorno, 0)
        // updatePlayBar(arrayRitorno[0])
    }).catch(err => {
        console.error(err)
    })
})
