
import { Track } from '../classi/tracksClass.js'

const artistPlaylistFetch = function (artistId) {
    return fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId + "/top?limit=10", {
        headers: {}
    })
        .then((response) => {

            return response.json()

        })
        .then((data) => {
            let arrayTracks = []

            for (let indexTracks = 0; indexTracks < data.data.length; indexTracks++) {
                let newTrack = new Track(
                    data.data[indexTracks].album,
                    data.data[indexTracks].artist,
                    data.data[indexTracks].duration,
                    data.data[indexTracks].explicit_content_cover,
                    data.data[indexTracks].explicit_content_lyrics,
                    data.data[indexTracks].explicit_lyrics,
                    data.data[indexTracks].id,
                    data.data[indexTracks].link,
                    data.data[indexTracks].md5_image,
                    data.data[indexTracks].preview,
                    data.data[indexTracks].rank,
                    data.data[indexTracks].readable,
                    data.data[indexTracks].title,
                    data.data[indexTracks].title_short,
                    data.data[indexTracks].title_version
                )
                arrayTracks.push(newTrack)
            }
            return arrayTracks
        })
        .catch((err) => {
            console.log(err)
        })


}

export { artistPlaylistFetch }