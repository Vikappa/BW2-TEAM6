const updatePlayBar = function (tracklist, trackIndex) {
    if (trackIndex < 0) {
        trackIndex = tracklist.length - 1
    } else if (trackIndex >= tracklist.length) {
        trackIndex = 0
    }

    document.getElementById('playBar').innerHTML = ``
    document.getElementById('playBar').appendChild(audioPlayer(tracklist, trackIndex))
}

const updateHero = function (tracklist, ntraccia) {
    document.getElementById('titoloHeaderTrack').textContent = tracklist[ntraccia].title
    if (document.getElementById('titoloHeaderTrack').innerHTML.length > 20) {
        document.getElementById('titoloHeaderTrack').innerHTML = document.getElementById('titoloHeaderTrack').innerHTML.substring(0, 20) + '...';
    }
    document.getElementById('artistHeaderTrack').textContent = tracklist[ntraccia].artist.name
    document.getElementById('ascolta').textContent = tracklist[ntraccia].artist.name
    document.getElementById('recordType').textContent = tracklist[ntraccia].album.type
    document.getElementById('imgHeroTrack').src = tracklist[ntraccia].album.cover_medium
}

const isOnSpecificPage = function () {
    var pathname = window.location.pathname
    return pathname.split("/").pop()
}

const audioPlayer = function (tracklist, index) {
    const mainDiv = document.createElement('div')
    mainDiv.classList.add("bg-tertiary")
    mainDiv.classList.add("d-flex")
    mainDiv.classList.add("justify-content-center")
    const audioElement = new Audio(tracklist[index].preview)

    if (isOnSpecificPage() === 'index.html') {
        updateHero(tracklist, index)
    }

    if (isOnSpecificPage() === 'album.html') {

        let listaLinkCanzoni = document.querySelectorAll('.songtitle');

        for (let traccia = 0; traccia < listaLinkCanzoni.length; traccia++) {
            listaLinkCanzoni[traccia].classList.remove('text-primary')
            listaLinkCanzoni[traccia].classList.add('text-white')
        }

        listaLinkCanzoni[index].classList.remove('text-white')
        listaLinkCanzoni[index].classList.add('text-primary')

    }



    const buttonPrevious = document.createElement('button')
    buttonPrevious.innerHTML = `<i class="bi bi-rewind-circle-fill"></i>`


    const buttonPlay = document.createElement('button')
    buttonPlay.innerHTML = `<i class="bi bi-play-circle-fill"></i>`


    if (isOnSpecificPage() === 'index.html') {

        document.getElementById('heroPlay').addEventListener('click', () => {
            if (audioElement.paused) {
                audioElement.play()
                buttonPlay.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`
                document.getElementById('heroPlay').innerHTML = "Pausa"
            } else {
                audioElement.pause()
                buttonPlay.innerHTML = `<i class="bi bi-play-circle-fill"></i>`
                document.getElementById('heroPlay').innerHTML = "Play"
            }
        })
    }

    buttonPlay.addEventListener('click', () => {
        if (audioElement.paused) {
            audioElement.play()
            buttonPlay.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`
        } else {
            audioElement.pause()
            buttonPlay.innerHTML = `<i class="bi bi-play-circle-fill"></i>`
        }
    })

    audioElement.addEventListener('ended', () => {
        console.log("end")
        buttonPlay.innerHTML = `<i class="bi bi-play-circle-fill"></i>`
        document.getElementById('heroPlay').innerHTML = "Play"
    })

    const buttonNext = document.createElement('button')
    buttonNext.innerHTML = `<i class="bi bi-fast-forward-circle-fill"></i>`

    buttonPrevious.addEventListener('click', () => {
        audioElement.pause()
        audioElement.remove()
        updatePlayBar(tracklist, index - 1)
    })

    buttonNext.addEventListener('click', () => {
        audioElement.pause()
        audioElement.remove()
        updatePlayBar(tracklist, index + 1)
    })

    mainDiv.appendChild(buttonPrevious)
    mainDiv.appendChild(buttonPlay)
    mainDiv.appendChild(buttonNext)

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (!document.body.contains(mainDiv)) {
                audioElement.pause()
                observer.disconnect()
            }
        })
    })



    return mainDiv
}

export { audioPlayer }