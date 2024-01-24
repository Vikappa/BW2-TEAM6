import { Album } from './albumClass.js'
import { Artist } from './artistClass.js'
import { Genre } from './genreClass.js'
import { Track } from './tracksClass.js'
import { catchArtist } from './fetchArtistObg.js'

const addressBar = new URLSearchParams(location.search)
const albumId = addressBar.get("artistId")
let currentArtist = {}

const fillWithArtist = function (artista) {
    document.getElementById('nomeArtista').innerText = artista.name;
    document.getElementById('verificato').innerText = artista.radio ? "Artista Verificato" : "Artista non verificato";
    document.getElementById('imgWrapper').style.backgroundImage = `url('${artista.picture_xl}')`;
    console.log(currentArtist);
}


catchArtist(albumId)
    .then((data) => {
        currentArtist = data
        fillWithArtist(currentArtist)
    })
    .catch((err) => {
        console.log(err)
    })