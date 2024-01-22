// REFERENCES

const albumAPI =
  "https://striveschool-api.herokuapp.com/api/deezer/album/75621062";

// const addressBarContent = new URLSearchParams(location.search);
// const albumId = addressBarContent.get("albumId");

const albumCover = document.getElementById("albumCover");
const albumTracks = document.getElementById("albumTracks");
const trackName = document.getElementById("trackName");
const trackReproductions = document.getElementById("trackReproductions");
const trackDuration = document.getElementById("trackDuration");

// FETCH
fetch(albumAPI)
  .then((response) => {
    if (response.ok) {
      console.log(response);
      return response.json();
    }
  })
  .then((album) => {
    console.log(album);
    // POPOLAMENTO DINAMICO DELLA SEZIONE ALBUM (copertina e info)
    const newRow = document.createElement("div");
    newRow.classList.add("row");
    newRow.innerHTML = `
    <div class="col-2">
    <img
      src=${album.cover}
      alt=${album.title}
      class="shadow-lg w-100"
    />
  </div>
  <div class="col-10">
    <p class="text-white">ALBUM</p>
    <h1 class="text-white">${album.title}</h1>
    <div class="text-white d-flex align-items-center">
        <img
        src=${album.artist.picture}
        alt=${album.artist.name}
        class="d-inline-block rounded-circle me-2"
        style="width: 40px"
        />
      <p class="d-inline-block m-0">
      ${album.artist.name} · ${album.release_date} · ${album.nb_tracks},
        <span class="text-secondary">${Math.floor(
          album.duration / 60
        )}min</span>
      </p>
    </div>
  </div>`;
    albumCover.appendChild(newRow);
    // POPOLAMENTO DINAMICO DELLE TRACCE DELL'ALBUM
    album.tracks.data.forEach((element, i) => {
      const newRow2 = document.createElement("div");
      newRow2.classList.add("row");
      newRow2.innerHTML = `
      <div class="col-7 d-flex mb-3">
      <p class="me-3 mb-0 text-secondary d-flex align-items-center">${i + 1}</p>
      <div class="d-flex flex-column">
      <p class="text-white mb-1">${element.title}</p>
      <p class="m-0 text-secondary">${element.artist.name}
      </p>
      </div>
    </div>
    <div class="col-3 d-flex align-items-center text-secondary">
      <p class="mb-0">${element.rank}</p>
    </div>
    <div class="col-2 text-center d-flex align-items-center justify-content-center text-secondary">
    <p class="mb-0">${element.duration}</p>
    </div>`;
      albumTracks.appendChild(newRow2);
    });
  })
  .catch((err) => {
    alert("Ops... Something went wrong", err);
  });
