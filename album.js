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
    <div class="col-md-2 col-10 mx-auto">
    <img
      src=${album.cover}
      alt=${album.title}
      class="shadow-lg w-100 mb-3 mb-md-0"
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
      ${album.artist.name} · ${album.release_date} · ${album.nb_tracks} brani,
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
    // POPOLAMENTO DINAMICO DELLE TRACCE DELL'ALBUM
    album.tracks.data.forEach((element, i) => {
      const newRowDesktop = document.createElement("div");
      newRowDesktop.classList.add("row");
      newRowDesktop.classList.add("d-none");
      newRowDesktop.classList.add("d-md-flex");
      newRowDesktop.innerHTML = `
      <div class="col-7 d-flex mb-3">
      <p class="me-4 mb-0 text-secondary d-flex align-items-center">${i + 1}</p>
      <div class="d-flex flex-column">
      <p class="text-white mb-1">${element.title}</p>
      <p class="m-0 text-secondary">${element.artist.name}
      </p>
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
      newRowMobile.classList.add("row");
      newRowMobile.classList.add("d-md-none");
      newRowMobile.innerHTML = `
      <div class="col-12 d-flex justify-content-between align-items-center mb-3">
        <div>
          <p class="text-white mb-1">${element.title_short}</p>
          <p class="text-secondary mb-0">${element.artist.name}</p>
        </div>
        <button class="btn btn-black text-secondary fs-3"><i class="bi bi-three-dots-vertical"></i></button>
      </div>
      `;
      albumTracks.appendChild(newRowMobile);
    });
  })
  .catch((err) => {
    alert("Ops... Something went wrong", err);
  });
