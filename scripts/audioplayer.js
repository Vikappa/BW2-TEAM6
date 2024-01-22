

const audioPlayer = function (trackObj) {
    const mainDiv = document.createElement('div')
    mainDiv.classList.add("bg-tertiary")
    mainDiv.classList.add("d-flex")
    mainDiv.classList.add("justify-content-between")
    const audioElement = new Audio(trackObj.preview)

    console.log()

    const leftSide = document.createElement('div')
    const leftSideTitoli = document.createElement('div')
    leftSide.classList.add("d-flex")
    leftSide.classList.add("mx-2")
    leftSide.classList.add("text-nowrap")
    leftSideTitoli.classList.add("d-flex")
    leftSideTitoli.classList.add("flex-column")
    leftSideTitoli.classList.add("text-white")

    leftSideTitoli.classList.add("ms-3")
    const currentPlayingAlbum = document.createElement('img')
    const currentPlayingSong = document.createElement('p')
    const currentPlayingArtist = document.createElement('p')
    currentPlayingAlbum.src = trackObj.album.cover_small
    currentPlayingAlbum.id = "albumCoverPlayerbar"
    currentPlayingAlbum.classList.add("p-2")
    currentPlayingSong.innerText = trackObj.title
    currentPlayingArtist.innerText = trackObj.artist.name
    leftSideTitoli.appendChild(currentPlayingSong)
    leftSideTitoli.appendChild(currentPlayingArtist)
    leftSide.appendChild(currentPlayingAlbum)
    leftSide.appendChild(leftSideTitoli)

    const midDiv = document.createElement('div')
    midDiv.classList.add('d-flex')
    midDiv.classList.add('align-items-center')
    midDiv.classList.add('gap-3')

    let buttonRewind = document.createElement('button')
    buttonRewind.classList.add('text-white')
    buttonRewind.classList.add('btn')
    buttonRewind.classList.add('fs-3')
    buttonRewind.classList.add('hover-red')
    buttonRewind.classList.add('p-0')
    buttonRewind.innerHTML = `<i class="bi bi-play-circle-fill"></i>`
    let buttonPlay = document.createElement('button')
    buttonPlay.addEventListener('click', () => {
        if (audioElement.paused) {
            audioElement.play()
            buttonPlay.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`
        } else {
            audioElement.pause()
            buttonPlay.innerHTML = `<i class="bi bi-play-circle-fill"></i>`
        }
    });
    buttonPlay.classList.add('text-white')
    buttonPlay.classList.add('btn')
    buttonPlay.classList.add('fs-1')
    buttonPlay.classList.add('hover-green')
    buttonPlay.classList.add('p-0')
    buttonPlay.innerHTML = `<i class="bi bi-play-circle-fill"></i>`
    let buttonForward = document.createElement('button')
    buttonForward.classList.add('text-white')
    buttonForward.classList.add('btn')
    buttonForward.classList.add('fs-3')
    buttonForward.classList.add('hover-red')
    buttonForward.classList.add('p-0')


    buttonForward.innerHTML = `<i class="bi bi-play-circle-fill"></i>`
    midDiv.appendChild(buttonRewind)
    midDiv.appendChild(buttonPlay)
    midDiv.appendChild(buttonForward)

    const rightDiv = document.createElement('div')
    rightDiv.classList.add('d-flex')
    rightDiv.classList.add('flex-align-center')
    rightDiv.classList.add('text-white')
    rightDiv.classList.add('me-5')
    const filler = document.createElement('p')
    const barraAudio = document.createElement('input')
    barraAudio.type = 'range'
    barraAudio.min = 0
    barraAudio.max = 1
    barraAudio.step = 0.01
    barraAudio.value = audioElement.volume
    barraAudio.addEventListener('input', () => {
        audioElement.volume = barraAudio.value
    })
    rightDiv.appendChild(barraAudio)

    mainDiv.appendChild(leftSide)
    mainDiv.appendChild(midDiv)
    mainDiv.appendChild(rightDiv)
    return mainDiv
}

export { audioPlayer }