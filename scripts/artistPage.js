import { catchArtist } from "./fetchArtistObg.js";
import { searchAlbum } from "./searchAlbumQuery.js";
import { audioPlayer, currentTrack } from "./audioplayer.js";
import { artistPlaylistFetch } from "./artistPlaylistFetch.js";

const addressBar = new URLSearchParams(location.search);
const albumId = addressBar.get("artistId");
let currentArtist = {};
let currentTracklist = [];

const updatePlayBar = function (tracklist, trackIndex) {
  if (trackIndex < 0) {
    trackIndex = tracklist.length - 1;
  } else if (trackIndex >= tracklist.length) {
    trackIndex = 0;
  }

  document.getElementById("playBar").innerHTML = ``;
  document
    .getElementById("playBar")
    .appendChild(audioPlayer(tracklist, trackIndex));
};

const divSong = function (track, ntrack) {
  const maindiv = document.createElement("div");
  maindiv.innerHTML = `
  <div class="row mb-3 d-flex  align-items-center"> 
  <div class=" col-12 col-md-7 d-flex align-items-center" >
  <span class="sp-nt">${ntrack + 1}</span>
  <img class="pe-5  pe-md-4" src="${track.album.cover_small}"/>
  <a class="songtitle text-decoration-none " href="#">${track.title}</a>
  </div>
  <div class="col-3 d-none d-md-block">
  <span class=" text-white">${track.rank}</span>
  </div>
  <div class="col-2 d-none d-md-block">
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
  popolari.classList.add("text-white", "mt-3", "mb-4");
  popolari.innerText = "Popolari:";
  document.getElementById("containerBrani").appendChild(popolari);
  for (let index = 0; index < 10; index++) {
    let newDiv = divSong(tracklistArtista[index], index);
    document.getElementById("containerBrani").appendChild(newDiv);
  }
  let listaAncore = document.querySelectorAll(".songtitle");
  for (let x = 0; x < listaAncore.length; x++) {
    let ancora = listaAncore[x];
    ancora.addEventListener("click", function (event) {
      updatePlayBar(currentTracklist, x);
      event.preventDefault();
    });
  }
};

const fillWithArtist = function (artista) {
  document.getElementById("nomeArtista").innerText = artista.name;
  document.getElementById("verificato").innerHTML = artista.radio
    ? ` <i class="bi bi-patch-check-fill text-info"></i> Artista Verificato`
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
      currentTracklist = artist;
      fillWithSongs(currentTracklist);
      let player = audioPlayer(currentTracklist, 0);
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

const dinamicUser = document.getElementById("dinamic-user");

const insertDinamicUser = function () {
  if (localStorage.getItem("user")) {
    const userData = JSON.parse(localStorage.getItem("user"));
    dinamicUser.innerHTML = `
      <button
      class="btn btn-dark userButton text-white rounded-pill p-1 d-flex align-items-center gap-1"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
    <img
    src=${userData.picToInsert}
    class="rounded-circle"
    height="30px"
    width="30px"
  />
      ${userData.nameToInsert}
    </button>`;
  }
};

insertDinamicUser();
