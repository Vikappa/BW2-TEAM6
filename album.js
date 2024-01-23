import { catchAlbum } from "./scripts/fetchAlbumObg.js";

const albumCover = document.getElementById("albumCover");
const albumTracks = document.getElementById("albumTracks");
const trackName = document.getElementById("trackName");
const trackReproductions = document.getElementById("trackReproductions");
const trackDuration = document.getElementById("trackDuration");

// IMAGE AVERAGE COLOR

// crea un canvas con l'immagine e ne ritorno il context 2d
const draw = function (img) {
  let canvas = document.createElement("canvas");
  let c = canvas.getContext("2d");
  c.width = canvas.width = img.clientWidth;
  c.height = canvas.height = img.clientHeight;
  c.clearRect(0, 0, c.width, c.height);
  c.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
  return c;
};

// scompone pixel per pixel e ritorna un oggetto con una mappa della loro frequenza nell'immagine
const getColors = function (c) {
  let col,
    colors = {};
  let pixels, r, g, b, a;
  r = g = b = a = 0;
  pixels = c.getImageData(0, 0, c.width, c.height);
  for (let i = 0, data = pixels.data; i < data.length; i += 4) {
    r = data[i];
    g = data[i + 1];
    b = data[i + 2];
    a = data[i + 3];
    if (a < 255 / 2) continue;
    col = rgbToHex(r, g, b);
    if (!colors[col]) colors[col] = 0;
    colors[col]++;
  }
  return colors;
};

// trova il colore più ricorrente data una mappa di frequenza dei colori
const findMostRecurrentColor = function (colorMap) {
  let highestValue = 0;
  let mostRecurrent = null;
  for (const hexColor in colorMap) {
    if (colorMap[hexColor] > highestValue) {
      mostRecurrent = hexColor;
      highestValue = colorMap[hexColor];
    }
  }
  return mostRecurrent;
};

// converte un valore in rgb a un valore esadecimale
const rgbToHex = function (r, g, b) {
  if (r > 255 || g > 255 || b > 255) {
    throw "Invalid color component";
  } else {
    return ((r << 16) | (g << 8) | b).toString(16);
  }
};

// inserisce degli '0' se necessario davanti al colore in esadecimale per renderlo di 6 caratteri
const pad = function (hex) {
  return ("000000" + hex).slice(-6);
};

// const generateImage = function () {
//   // genero dinamicamente un tag <img /> in un <div> vuoto

//   let imageSrc =
//     "https://e-cdns-images.dzcdn.net/images/artist/7f6e8be161417ad8ce8f09b45721544f/500x500-000000-80-0-0.jpg";

//   let reference = document.getElementById("container");

//   // l'event listener "onload" nel tag <img /> si occupa di lanciare la funzione "start()" solamente
//   // al termine del caricamento della src
//   reference.innerHTML = `
//     <img
//       src=${imageSrc}
//       id="img"
//       crossorigin="anonymous"
//       onload="start()"
//     />`;
// };

const start = function () {
  // prendo il riferimento all'immagine del dom
  let imgReference = document.querySelector("#img");

  // creo il context 2d dell'immagine selezionata
  let context = draw(imgReference);

  // creo la mappa dei colori più ricorrenti nell'immagine
  let allColors = getColors(context);

  // trovo colore più ricorrente in esadecimale
  let mostRecurrent = findMostRecurrentColor(allColors);

  // se necessario, aggiunge degli '0' per rendere il risultato un valido colore esadecimale
  let mostRecurrentHex = pad(mostRecurrent);

  // console.log del risultato
  console.log(mostRecurrentHex);
  return mostRecurrentHex;
};

// FETCH
let album;
catchAlbum("75621062")
  .then((result) => {
    album = result;

    const newRow = document.createElement("div");
    newRow.classList.add("row");
    newRow.innerHTML = `
    <div class="col-md-2 col-10 mx-auto">
    <img
      src="${album.cover_xl}"
      alt=${album.title}
      class="shadow-lg w-100 mb-3 mb-md-0"
      id="img"
      crossOrigin="anonymous"
    />
  </div>
  <div class="col-10 d-flex flex-column justify-content-end">
    <small class="d-none d-md-block text-white mb-2">ALBUM</small>
    <h1 class="text-white">${album.title}</h1>
    <div class="text-white d-flex align-items-center">
        <img
        src=${album.artist.picture}
        alt=${album.artist.name}
        class="d-inline-block rounded-circle me-2"
        style="width: 40px"
        />
      <p class="d-none d-md-inline-block m-0">
      ${album.artist.name} · ${album.release_date.slice(0, 4)} · ${
      album.nb_tracks
    } brani,
        <span class="text-secondary">${Math.floor(album.duration / 60)} min ${
      album.duration % 60
    } sec.</span>
      </p>
      <p class="d-md-none m-0">${album.artist.name}</p>
    </div>
    <p class="text-secondary mt-2 mb-0 d-md-none">Album · ${album.release_date.slice(
      0,
      4
    )}</p>
  </div>`;
    albumCover.appendChild(newRow);
    console.log(album.tracks);
    for (let i = 0; i < album.tracks.length; i++) {
      const element = album.tracks[i];
      // POPOLAMENTO DINAMICO DELLE TRACCE DELL'ALBUM
      const newRowDesktop = document.createElement("div");
      newRowDesktop.classList.add("row", "d-none", "d-md-flex");
      newRowDesktop.innerHTML = `
          <div class="col-7 d-flex mb-3">
              <p class="me-4 mb-0 text-secondary d-flex align-items-center">${
                i + 1
              }</p>
              <div class="d-flex flex-column">
                  <p class="text-white mb-1">${element.title}</p>
                  <p class="m-0 text-secondary">${element.artist.name}</p>
              </div>
          </div>
          <div class="col-3 d-flex align-items-center text-secondary mb-3">
              <p class="mb-0">${element.rank}</p>
          </div>
          <div class="col-2 text-center d-flex align-items-center justify-content-center text-secondary mb-3">
              <p class="mb-0">${Math.floor(element.duration / 60)}:${
        element.duration % 60
      }</p>
          </div>`;
      albumTracks.appendChild(newRowDesktop);

      const newRowMobile = document.createElement("div");
      newRowMobile.classList.add("row", "d-md-none");
      newRowMobile.innerHTML = `
          <div class="col-12 d-flex justify-content-between align-items-center mb-3">
              <div>
                  <p class="text-white mb-0">${element.title_short}</p>
                  <p class="text-secondary mb-0">${element.artist.name}</p>
              </div>
              <button class="btn btn-black text-secondary fs-3"><i class="bi bi-three-dots-vertical"></i></button>
          </div>`;
      albumTracks.appendChild(newRowMobile);
    }
    const bgColor = "#" + start();
    console.log(bgColor);

    const bgArray = Array.from(document.getElementsByClassName("bg-color"));
    bgArray.forEach((element) => {
      element.style.backgroundColor = bgColor;
    });

    const linearArray = Array.from(
      document.getElementsByClassName("bg-linear")
    );
    linearArray.forEach((element) => {
      element.style.background = `linear-gradient(0deg, rgba(0,0,0,1) 0%, ${bgColor} 100%)`;
    });
  })

  .catch((error) => {
    console.error("Si è verificato un errore nella casella di ricerca:", error);
  });
