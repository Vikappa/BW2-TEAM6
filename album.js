import { catchAlbum } from "./scripts/fetchAlbumObg.js";
import { audioPlayer } from "./scripts/audioplayer.js";

const albumCover = document.getElementById("albumCover");
const albumTracks = document.getElementById("albumTracks");
const addressBar = new URLSearchParams(location.search);
const albumId = addressBar.get("albumId");

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

// FUNZIONE PER IL COLORE DEL TESTO DINAMICO

const hexToRgb = function (hex) {
  // Remove the hash if it exists
  hex = hex.replace(/^#/, "");

  // Parse the hex value
  const bigint = parseInt(hex, 16);

  // Extract the RGB components
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return the RGB values as an object
  return { r: r, g: g, b: b };
};

// FETCH
let album;
catchAlbum(albumId)
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
  <div class="col-md-10 col-12 d-flex flex-column justify-content-end text-dinamic">
    <small class="d-none d-md-block mb-2">ALBUM</small>
    <h1>${album.title}</h1>
    <div class="text-white d-flex align-items-center">
        <a href="./artist.html?artistId=${album.artist.id}"> 
          <img
          src=${album.artist.picture}
          alt=${album.artist.name}
          class="d-inline-block rounded-circle me-2"
          style="width: 40px"
          />
        </a>
      <p class="d-none d-md-inline-block m-0 text-dinamic">
      <a href="./artist.html?artistId=${album.artist.id
      }" class="text-decoration-none text-dinamic">${album.artist.name
      }</a> · ${album.release_date.slice(0, 4)} · ${album.nb_tracks} brani,
        <span class="text-secondary">${Math.floor(album.duration / 60)} min ${album.duration % 60
      } sec.</span>

      </p>
      <a href="./artist.html?artistId=${album.artist.id
      }" class="d-md-none m-0 text-decoration-none text-dinamic">
        <p class="m-0">${album.artist.name}</p>
      </a>
    </div>
    <p class="text-secondary mt-2 mb-0 d-md-none">Album · ${album.release_date.slice(
        0,
        4
      )}</p>
  </div>`;
    albumCover.appendChild(newRow);

    for (let i = 0; i < album.tracks.length; i++) {
      const updateTrack = function (trackN) {
        document.getElementById('playBar').innerHTML = ``
        document.getElementById('playBar').appendChild(audioPlayer(album.tracks, trackN))
      }
      const element = album.tracks[i];
      // POPOLAMENTO DINAMICO DELLE TRACCE DELL'ALBUM
      const newRowDesktop = document.createElement("div");
      newRowDesktop.classList.add("row", "d-none", "d-md-flex");

      const col7 = document.createElement("div");
      col7.classList.add("col-7", "d-flex", "mb-3");

      const trackNumberP = document.createElement("p");
      trackNumberP.classList.add("me-4", "mb-0", "text-secondary", "d-flex", "align-items-center");
      trackNumberP.textContent = i + 1;

      const flexColumnDiv = document.createElement("div");
      flexColumnDiv.classList.add("d-flex", "flex-column");

      const songTitleA = document.createElement("a");
      songTitleA.href = "#";
      songTitleA.classList.add("text-white", "mb-1", "songtitle");
      songTitleA.textContent = element.title;
      songTitleA.addEventListener('click', function (event) {
        event.preventDefault();
        let audioElements = document.querySelector('#audioDin')

        console.log(audioElements)
        updateTrack(i);
      });

      const artistP = document.createElement("p");
      artistP.classList.add("m-0", "text-secondary");
      artistP.textContent = element.artist.name;

      // Costruzione della struttura
      flexColumnDiv.appendChild(songTitleA);
      flexColumnDiv.appendChild(artistP);
      col7.appendChild(trackNumberP);
      col7.appendChild(flexColumnDiv);
      newRowDesktop.appendChild(col7);

      // Aggiunta di ulteriori colonne in modo simile
      const col3 = document.createElement("div");
      col3.classList.add("col-3", "d-flex", "align-items-center", "text-secondary", "mb-3");
      const rankP = document.createElement("p");
      rankP.classList.add("mb-0");
      rankP.textContent = element.rank;
      col3.appendChild(rankP);
      newRowDesktop.appendChild(col3);

      const col2 = document.createElement("div");
      col2.classList.add("col-2", "text-center", "d-flex", "align-items-center", "justify-content-center", "text-secondary", "mb-3");
      const durationP = document.createElement("p");
      durationP.classList.add("mb-0");
      durationP.textContent = `${Math.floor(element.duration / 60)}:${element.duration % 60}`;
      col2.appendChild(durationP);
      newRowDesktop.appendChild(col2);

      // Aggiunta della riga completa al contenitore
      albumTracks.appendChild(newRowDesktop);

      const newRowMobile = document.createElement("div");
      newRowMobile.classList.add("row", "d-md-none");
      newRowMobile.innerHTML = `
          <div class="col-12 d-flex justify-content-between align-items-center mb-3">
              <div>
                  <p class="text-white mb-0">${element.title_short}</p>
                  <a href="./artist.html?artistId=${album.artist.id}" class="text-decoration-none">
                    <p class="text-secondary mb-0">${element.artist.name}</p>
                  </a>
              </div>
              <button class="btn btn-black text-secondary fs-3"><i class="bi bi-three-dots-vertical"></i></button>
          </div>`;
      albumTracks.appendChild(newRowMobile);
    }

    document.getElementById('playBar').appendChild(audioPlayer(album.tracks, 0))


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

    const rgbValue = hexToRgb(bgColor);
    console.log(rgbValue);

    const textDinamic = Array.from(
      document.getElementsByClassName("text-dinamic")
    );

    const textColorDinamic = function () {
      if ((rgbValue.r + rgbValue.b + rgbValue.g) / 3 > 128) {
        textDinamic.forEach((element) => {
          element.classList.add("text-black");
        });
      } else {
        textDinamic.forEach((element) => {
          element.classList.add("text-white");
        });
      }
    };

    textColorDinamic();
  })

  .catch((error) => {
    console.error("Si è verificato un errore nella casella di ricerca:", error);
  });
