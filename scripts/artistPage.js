import { catchArtist } from "./fetchArtistObg.js";
import { searchAlbum } from "./searchAlbumQuery.js";
import { audioPlayer, currentTrack } from "./audioplayer.js";
import { artistPlaylistFetch } from "./artistPlaylistFetch.js";

const addressBar = new URLSearchParams(location.search);
const albumId = addressBar.get("artistId");
let currentArtist = {};

const divSong = function (track, ntrack) {
  console.log(track);
  const maindiv = document.createElement("div");
  maindiv.innerHTML = `
  <div class="row mb-3 d-flex  align-items-center"> 
  <div class="col-7 d-flex align-items-center" >
  <span class="sp-nt">${ntrack + 1}</span>
  <img class="pe-4" src="${track.album.cover_small}"/>
  <a class="songtitle text-decoration-none " href="#">${track.title}</a>
  </div>
  <div class="col-3">
  <span class=" text-white">${track.rank}</span>
  </div>
  <div class="col-2">
  <span class="text-white"> ${Math.floor(track.duration / 60)} min ${
    track.duration % 60
  }
    </span>
  </div>

   </div>
  
  `;

  return maindiv;
};

const fillWithSongs = function (tracklistArtista) {
  document.getElementById("containerBrani").innerHTML = ``;
  const popolari = document.createElement("h2");
  popolari.innerText = "Popolari:";
  document.getElementById("containerBrani").appendChild(popolari);
  for (let index = 0; index < 10; index++) {
    let newDiv = divSong(tracklistArtista[index], index);
    document.getElementById("containerBrani").appendChild(newDiv);
  }
};

const fillWithArtist = function (artista) {
  document.getElementById("nomeArtista").innerText = artista.name;
  document.getElementById("verificato").innerText = artista.radio
    ? "Artista Verificato"
    : "Artista non verificato";
  document.getElementById(
    "imgWrapper"
  ).style.backgroundImage = `url('${artista.picture_xl}')`;
  let newImg = document.createElement("img");
  newImg.classList.add("rounded-circle");
  newImg.src = artista.picture_small;
  document.getElementById("imgSmall").appendChild(newImg);

  document.getElementById("artistImgSmall");
  console.log(artista.id);
  artistPlaylistFetch(artista.id)
    .then((artist) => {
      fillWithSongs(artist);
      let player = audioPlayer(artist, 0);
      document.getElementById("playBar").appendChild(player);
      currentTrack.play();
    })
    .catch((err) => {
      console.log(err);
    });
};

catchArtist(albumId)
  .then((data) => {
    currentArtist = data;
    fillWithArtist(currentArtist);
  })
  .catch((err) => {
    console.log(err);
  });
