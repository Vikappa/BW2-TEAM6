import { catchArtist } from "../fetchArtistObg.js";
import { searchAlbum } from "../searchAlbumQuery.js";
import { audioPlayer, currentTrack } from "../audioplayer.js";
import { artistPlaylistFetch } from "../fetchAPI/artistPlaylistFetch.js";

const addressBar = new URLSearchParams(location.search);
const albumId = addressBar.get("artistId");
let currentArtist = {};
let currentTracklist = [];
