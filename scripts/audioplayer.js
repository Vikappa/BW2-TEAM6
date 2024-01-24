let currentTrack

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
    // Creazione del primo div e dell'immagine al suo interno
    let heroAlbum = document.createElement("div")
    heroAlbum.id = "heroAlbum"

    let imgHeroTrack = document.createElement("img")
    imgHeroTrack.id = "imgHeroTrack"
    imgHeroTrack.src = tracklist[ntraccia].album.cover_medium
    heroAlbum.appendChild(imgHeroTrack)
    let secondDiv = document.createElement("div")
    secondDiv.classList.add("d-flex")
    secondDiv.classList.add("flex-column")
    secondDiv.classList.add("px-3")
    secondDiv.classList.add("grow-1")
    secondDiv.classList.add("w-100")
    let innerDiv = document.createElement("div")
    innerDiv.classList.add("d-flex")
    innerDiv.classList.add("justify-content-between")
    let h5 = document.createElement("h5")
    h5.textContent = "ALBUM"
    let h6 = document.createElement("h6")
    h6.classList.add("text-secondary")
    h6.textContent = "NASCONDI ANNUNCI"

    innerDiv.appendChild(h5)
    innerDiv.appendChild(h6)
    secondDiv.appendChild(innerDiv)

    let h1 = document.createElement("h1")
    h1.id = "titoloHeaderTrack"
    h1.style.fontSize = "4.5rem"
    h1.textContent = tracklist[ntraccia].title
    secondDiv.appendChild(h1)

    let h5_2 = document.createElement("h5")
    h5_2.id = ("artistHeaderTrack")
    secondDiv.appendChild(h5_2)

    let p = document.createElement("p")
    console.log(tracklist[ntraccia].artist)
    p.textContent = "Ascolto il nuovo " + tracklist[ntraccia].album.type + " di " + tracklist[ntraccia].artist.name

    secondDiv.appendChild(p)

    let divButtons = document.createElement("div")
    divButtons.setAttribute("class", "d-flex align-items-center gap-3 m-0 p-0 mx-5 my-3");

    let heroPlay = document.createElement("button");
    heroPlay.setAttribute("id", "heroPlay");
    heroPlay.setAttribute("type", "button");
    heroPlay.setAttribute("class", "btn rounded-pill fs-5 px-4 py-2 m-0 btn-primary");
    heroPlay.textContent = "Play";
    heroPlay.addEventListener('click', function () {
        document.getElementById('buttonPlay').click();
    })

    divButtons.appendChild(heroPlay)

    let buttonSave = document.createElement("button");
    buttonSave.setAttribute("type", "button");
    buttonSave.setAttribute("class", "btn rounded-pill fs-5 px-4 py-2 m-0 btn-outline-light text-white");
    buttonSave.textContent = "Salva";
    divButtons.appendChild(buttonSave);

    let icon = document.createElement("i");
    icon.setAttribute("class", "bi bi-three-dots");
    divButtons.appendChild(icon);

    secondDiv.appendChild(divButtons);
    heroAlbum.appendChild(secondDiv)

    document.getElementById('heroContainer').innerHTML = ``
    document.getElementById('heroContainer').appendChild(heroAlbum)

}

const isOnSpecificPage = function () {
    let pathname = window.location.pathname
    return pathname.split("/").pop()
}

const audioPlayer = function (tracklist, index) {


    const mainDiv = document.createElement('div')
    mainDiv.classList.add("bg-tertiary")
    mainDiv.classList.add("d-flex")
    mainDiv.classList.add("justify-content-center")

    currentTrack = new Audio(tracklist[index].preview)

    const buttonPrevious = document.createElement('button')
    buttonPrevious.innerHTML = `<i class="bi bi-rewind-circle-fill"></i>`

    const buttonPlay = document.createElement('button')
    buttonPlay.id = "buttonPlay"
    buttonPlay.innerHTML = `<i class="bi bi-play-circle-fill"></i>`

    const buttonNext = document.createElement('button')
    buttonNext.innerHTML = `<i class="bi bi-fast-forward-circle-fill"></i>`

    if (isOnSpecificPage() === 'index.html') {

        updateHero(tracklist, index)

        buttonPlay.addEventListener('click', () => {
            if (currentTrack.paused) {
                currentTrack.play()
                buttonPlay.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`
                document.getElementById('heroPlay').innerHTML = "Pausa"
            } else {
                currentTrack.pause()
                buttonPlay.innerHTML = `<i class="bi bi-play-circle-fill"></i>`
                document.getElementById('heroPlay').innerHTML = "Play"
            }
        })

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


    currentTrack.addEventListener('ended', () => {
        console.log("end")
        buttonPlay.innerHTML = `<i class="bi bi-play-circle-fill"></i>`
        if (isOnSpecificPage() === 'index.html') {
            document.getElementById('heroPlay').innerHTML = "Play"
        }
    })


    buttonPrevious.addEventListener('click', () => {
        currentTrack.pause()
        updatePlayBar(tracklist, index - 1)
    })

    buttonNext.addEventListener('click', () => {
        currentTrack.pause()
        updatePlayBar(tracklist, index + 1)
    })

    mainDiv.appendChild(buttonPrevious)
    mainDiv.appendChild(buttonPlay)
    mainDiv.appendChild(buttonNext)

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (!document.body.contains(mainDiv)) {
                currentTrack.pause()
                observer.disconnect()
            }
        })
    })



    return mainDiv
}

export { audioPlayer }