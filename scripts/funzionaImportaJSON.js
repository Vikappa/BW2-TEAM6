import { PlayList } from './playListClass.js'

export function fetchJSON() {
    const baseUrl = window.location.hostname.includes('github.io') ? '/BW2-TEAM6/' : '/'

    return fetch(baseUrl + 'playlistPreconfezionate/suggerimenti_premade.json')
        .then(response => response.json())
        .then(data => {
            let arrayPlayListRitorno = [];
            for (let index = 0; index < data.arrayPlayListPreconfezionate.length; index++) {
                let playListArtisti = new PlayList(
                    data.arrayPlayListPreconfezionate[index].nome,
                    data.arrayPlayListPreconfezionate[index].arrayTrack,
                    data.arrayPlayListPreconfezionate[index].img
                );
                arrayPlayListRitorno.push(playListArtisti)
            }
            return arrayPlayListRitorno
        })
        .catch(error => console.error('Errore durante il caricamento del file JSON:', error))
}
