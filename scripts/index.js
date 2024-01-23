// IMPORT
import { audioPlayer } from './audioplayer.js'
import { searchAlbum } from './searchAlbumQuery.js'
import { searchBar } from './searchBar.js'

// UTILITY
document.getElementById('closeRightBar').addEventListener("click", function () {
    document.getElementById('barraDestra').classList.add("closing")
})


const updatePlayBar = function (trackObj) {
    document.getElementById('playBar').innerHTML = ``
    document.getElementById('playBar').appendChild(audioPlayer(trackObj))
}

const showAmici = function () {

}

const start = function () {
    searchAlbum("Die Antwoord").then(arrayRitorno => {
        document.getElementById('titoloHeaderTrack').textContent = arrayRitorno[0].title
        document.getElementById('artistHeaderTrack').textContent = arrayRitorno[0].artist.name
        document.getElementById('ascolta').textContent = arrayRitorno[0].artist.name
        document.getElementById('recordType').textContent = arrayRitorno[0].album.type
        document.getElementById('imgHeroTrack').src = arrayRitorno[0].album.cover_medium
        updatePlayBar(arrayRitorno[0])


        document.getElementById("cercaAnchor").addEventListener('click', () => {
            document.getElementById("cercaAnchor").remove()
            document.getElementById('cercaLi').appendChild(searchBar())
            console.log()
        })


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

document.getElementById("Ermias").addEventListener('click', () => {


    searchAlbum("Kung fu fighting").then(arrayRitorno => {
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

document.getElementById("Fabios").addEventListener('click', () => {


    searchAlbum("Californication Red Hot").then(arrayRitorno => {
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

document.getElementById("Giuseppes").addEventListener('click', () => {


    searchAlbum("Highway hell ACDC").then(arrayRitorno => {
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


document.getElementById("Francescos").addEventListener('click', () => {


    searchAlbum("Body parts Marracash").then(arrayRitorno => {
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
