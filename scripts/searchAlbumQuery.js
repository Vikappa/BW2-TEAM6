import { Album } from './albumClass.js'
import { Artist } from './artistClass.js'
import { Genre } from './genreClass.js'
import { Track } from './tracksClass.js'
// RITORNA UN ARRAY DI MASSIMO 25 OGGETTI TRACK
const searchAlbum = function (querySearch) {
    return new Promise((resolve, reject) => {
        fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + querySearch, {
            headers: {}
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Errore nella chiamata');
                }
            })
            .then(data => {
                let arrayRitorno = [];
                for (let index = 0; index < data.data.length; index++) {
                    let newAlbum = {
                        cover: data.data[index].album.cover,
                        cover_big: data.data[index].album.cover_big,
                        cover_medium: data.data[index].album.cover_medium,
                        cover_small: data.data[index].album.cover_small,
                        cover_xl: data.data[index].album.cover_xl,
                        id: data.data[index].album.id,
                        md5_image: data.data[index].album.md5_image,
                        title: data.data[index].album.title,
                        tracklist: data.data[index].album.tracklist,
                        type: "album",
                    }

                    let newArtist = {
                        id: data.data[index].artist.id,
                        link: data.data[index].artist.link,
                        name: data.data[index].artist.name,
                        picture: data.data[index].artist.picture,
                        picture_big: data.data[index].artist.picture_big,
                        picture_medium: data.data[index].artist.picture_medium,
                        picture_small: data.data[index].artist.picture_small,
                        picture_xl: data.data[index].artist.picture_xl,
                        tracklist: data.data[index].artist.tracklist,
                        type: "type"
                    }

                    let newTrack = new Track(
                        newAlbum,
                        newArtist,
                        data.data[index].duration,
                        data.data[index].ecplicit_content_cover,
                        data.data[index].esplicit_content_lyrics,
                        data.data[index].esplicit_lyrics,
                        data.data[index].id,
                        data.data[index].link,
                        data.data[index].md5_image,
                        data.data[index].preview,
                        data.data[index].rank,
                        data.data[index].readable,
                        data.data[index].title,
                        data.data[index].title_short,
                        data.data[index].title_version,
                    )
                    arrayRitorno.push(newTrack);
                }
                resolve(arrayRitorno);
            })
            .catch(err => {
                console.log(err);
                reject(err);
            });
    });
};
export { searchAlbum }
