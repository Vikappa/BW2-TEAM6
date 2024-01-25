import { catchArtist } from "./fetchArtistObg.js";
import { searchAlbum } from "./searchAlbumQuery.js";
import { audioPlayer } from "./audioplayer.js";

const addressBar = new URLSearchParams(location.search);
const albumId = addressBar.get("artistId");
let currentArtist = {};

const divSong = function (track, ntrack) {
  const maindiv = document.createElement("div");
  maindiv.classList.add("d-flex");
  maindiv.classList.add("flex-column", "col");
  document.getElementById("containerBrani").appendChild(maindiv);
  let title = document.createElement("a");
  title.classList.add("songtitle", "text-decoration-none");
  title.innerText = track.title;
  let album = document.createElement("a");
  album.textContent = track.album.title;
  album.href = "./album.html?albumId=" + track.album.id;

  maindiv.appendChild(title);
  maindiv.appendChild(album);
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
    console.log(newDiv)
    console.log(document.getElementById("containerBrani"))
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
  document.getElementById("imgSmall");
  console.log(artista);
  document.getElementById("artistImgSmall");
  searchAlbum(artista.name)
    .then((artist) => {
      fillWithSongs(artist);
      let player = audioPlayer(artist, 0);
      document.getElementById("playBar").appendChild(player);
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
