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

    return wrapper
}

const divCardBuonasera = function (playlistItem) {
    let wrapper = document.createElement('div')

    return wrapper
}

const fillBarraSinistra = function () {

}


const fillBuonasera = function (arrayPlayList) {

}

const fillAltro = function (arrayPlayList) {

}

fetchJSON().then(arrayPlayList_dal_JSON => {

    fillBuonasera(arrayPlayList_dal_JSON)

    fillAltro(arrayPlayList_dal_JSON)
})
