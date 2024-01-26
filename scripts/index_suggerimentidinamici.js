import { fetchJSON } from './funzionaImportaJSON.js'
import { audioPlayer, updatePlayBar } from './audioplayer.js'
const shuffleArray = function (array) { //algoritmo di Fisher-Yates (o Knuth) shuffle
    let currentIndex = array.length, temporaryValue, randomIndex
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    return array
}

const divCardAltro = function (playlistItem) {
    let wrapper = document.createElement('div')
    wrapper.classList.add('m-0', 'p-0', 'd-flex', 'bg-tertiary', 'cardAltro', 'col-10', 'mx-auto', 'my-1', 'rounded-2')
    let innerDiv1 = document.createElement('div')
    innerDiv1.classList.add('col-3', 'm-0', 'p-0')
    let img = document.createElement('img')
    img.src = playlistItem.img
    img.classList.add('img-fluid')
    innerDiv1.appendChild(img)
    let innerDiv2 = document.createElement('div')
    innerDiv2.classList.add('col-9', 'm-0', 'p-0', 'd-flex', 'flex-column')
    let paragraph = document.createElement('p')
    paragraph.classList.add('my-auto', 'mx-1')
    if (playlistItem.nome.length > 28) {
        paragraph.textContent = playlistItem.nome.substring(0, 28) + '...'
    } else {
        paragraph.textContent = playlistItem.nome
    }
    innerDiv2.appendChild(paragraph)
    wrapper.appendChild(innerDiv1)
    wrapper.appendChild(innerDiv2)
    wrapper.addEventListener('click', function () {
        console.log(playlistItem)
        updatePlayBar(playlistItem.trackarray, 0)
    })
    return wrapper
}

const divCardBuonasera = function (playlistItem) {
    let wrapper = document.createElement('div')
    wrapper.classList.add('m-0', 'p-0', 'd-flex', 'bg-tertiary', 'cardBuonasera')
    let innerDiv1 = document.createElement('div')
    innerDiv1.classList.add('col-3', 'm-0', 'p-0')
    let img = document.createElement('img')
    img.src = playlistItem.img
    img.classList.add('img-fluid')
    innerDiv1.appendChild(img)
    let innerDiv2 = document.createElement('div')
    innerDiv2.classList.add('col-9', 'm-0', 'p-0', 'd-flex', 'flex-column')
    let paragraph = document.createElement('p')
    paragraph.classList.add('my-auto', 'mx-1')
    if (playlistItem.nome.length > 28) {
        paragraph.textContent = playlistItem.nome.substring(0, 28) + '...'
    } else {
        paragraph.textContent = playlistItem.nome
    }
    innerDiv2.appendChild(paragraph)
    wrapper.appendChild(innerDiv1)
    wrapper.appendChild(innerDiv2)
    wrapper.addEventListener('click', function () {
        updatePlayBar(playlistItem.trackarray, 0)
    })
    return wrapper
}

const fillBarraSinistra = function () {

}


const fillBuonasera = function (arrayPlayList) {
    for (let index = arrayPlayList.length - 1; index >= arrayPlayList.length - 6; index--) {
        document.getElementById('rowBuonasera').appendChild(divCardBuonasera(arrayPlayList[index]))
    }
}

const fillAltro = function (arrayPlayList) {
    const shuffledPlaylistArray = shuffleArray([...arrayPlayList])
    for (let index = 0; index < shuffledPlaylistArray.length; index++) {
        document.getElementById('rowAltroDiCioCheTiPiace').appendChild(divCardAltro(shuffledPlaylistArray[index]))
    }
}

fetchJSON().then(arrayPlayList_dal_JSON => {
    fillBuonasera(arrayPlayList_dal_JSON)
    fillAltro(arrayPlayList_dal_JSON)
})
