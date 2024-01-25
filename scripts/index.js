// IMPORT
import { audioPlayer } from "./audioplayer.js";
import { searchAlbum } from "./searchAlbumQuery.js";
import { searchBar } from "./searchBar.js";

// UTILITY
document.getElementById("closeRightBar").addEventListener("click", function () {
  document.getElementById("barraDestra").classList.add("closing");
});

const updatePlayBar = function (tracklist, trackIndex) {
  document.getElementById("playBar").innerHTML = ``;
  document
    .getElementById("playBar")
    .appendChild(audioPlayer(tracklist, trackIndex));
};

const isOnSpecificPage = function () {
  let pathname = window.location.pathname;
  return pathname.split("/").pop();
};

export { updatePlayBar };

const updateHero = function (tracklist, ntraccia) {
  document.getElementById("titoloHeaderTrack").textContent =
    tracklist[ntraccia].title;
  if (document.getElementById("titoloHeaderTrack").innerHTML.length > 20) {
    document.getElementById("titoloHeaderTrack").innerHTML =
      document.getElementById("titoloHeaderTrack").innerHTML.substring(0, 20) +
      "...";
  }
  document.getElementById("artistHeaderTrack").textContent =
    tracklist[ntraccia].artist.name;
  document.getElementById("ascolta").textContent =
    tracklist[ntraccia].artist.name;
  document.getElementById("recordType").textContent =
    tracklist[ntraccia].album.type;
  document.getElementById("imgHeroTrack").src =
    tracklist[ntraccia].album.cover_medium;
};

const start = function () {
  if (isOnSpecificPage() === "index.html") {
    searchAlbum("Salmo")
      .then((arrayRitorno) => {
        updateHero(arrayRitorno, 0);
        updatePlayBar(arrayRitorno, 0);
        document.getElementById("cercaAnchor").addEventListener("click", () => {
          document.getElementById("cercaAnchor").remove();
          document.getElementById("cercaLi").appendChild(searchBar());
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

// INIZIO ESECUZIONE VERA E PROPRIA
start();

document.getElementById("Vincenzos").addEventListener("click", () => {
  searchAlbum("Mantra Bring Me The Horizon")
    .then((arrayRitorno) => {
      updatePlayBar(arrayRitorno, 0);
    })
    .catch((err) => {
      console.error(err);
    });
});

document.getElementById("Ermias").addEventListener("click", () => {
  searchAlbum("Kung fu fighting")
    .then((arrayRitorno) => {
      updatePlayBar(arrayRitorno, 0);
    })
    .catch((err) => {
      console.error(err);
    });
});

document.getElementById("Fabios").addEventListener("click", () => {
  searchAlbum("Californication Red Hot")
    .then((arrayRitorno) => {})
    .catch((err) => {
      console.error(err);
    });
});

document.getElementById("Giuseppes").addEventListener("click", () => {
  searchAlbum("Highway hell ACDC")
    .then((arrayRitorno) => {
      updatePlayBar(arrayRitorno, 0);
    })
    .catch((err) => {
      console.error(err);
    });
});

document.getElementById("Francescos").addEventListener("click", () => {
  searchAlbum("Body parts Marracash")
    .then((arrayRitorno) => {
      updatePlayBar(arrayRitorno, 0);
    })
    .catch((err) => {
      console.error(err);
    });
});

// FUNZIONE PER IL LOG IN

const dinamicUser = document.getElementById("dinamic-user");
const loginButtons = Array.from(document.getElementsByClassName("loginButton"));

const login = function (e) {
  console.log(e.target);
  const nameToInsert = e.target.innerText;
  const picToInsert = e.target.getElementsByTagName("img")[0].src;
  dinamicUser.innerHTML = `
  <button
  class="btn btn-dark userButton text-white dropdown-toggle rounded-pill p-1 d-flex align-items-center gap-1"
  type="button"
  data-bs-toggle="dropdown"
  aria-expanded="false"
>
  <img
    src=${picToInsert}
    class="rounded-circle"
    height="30px"
    width="30px"
  />
  ${nameToInsert}
</button>
<ul class="dropdown-menu dropdown-menu-dark bg-dark">
  <li><a class="dropdown-item text-white" href="#">Amici</a></li>
  <li><a class="dropdown-item text-white" href="#">Playlist</a></li>
  <li>
    <a class="dropdown-item text-white" href="#"
      >Something else here</a
    >
  </li>
  <li
    class="dropdown-item text-white border border-white rounded-pill w-50 m-auto"
    id="logoutButton"
  >
    Logout
  </li>
  <li
    class="dropdown-item text-white border border-white rounded-pill w-50 m-auto d-none"
    data-bs-toggle="modal"
    data-bs-target="#LogInModal"
  >
    Log In
  </li>
</ul>`;

  const logoutButton = document.getElementById("logoutButton");

  logoutButton.addEventListener("click", logout);
};

const logout = function () {
  dinamicUser.innerHTML = `
    <button
    class="btn btn-dark userButton text-white dropdown-toggle rounded-pill p-1 d-flex align-items-center gap-1"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
  <i class="bi bi-person-circle"></i>
    User Account
  </button>
  <ul class="dropdown-menu dropdown-menu-dark bg-dark">
    <li
      class="dropdown-item text-white border border-white rounded-pill w-50 m-auto d-none"
      id="logoutButton"
    >
      Logout
    </li>
    <li
      class="dropdown-item text-white border border-white rounded-pill w-50 m-auto"
      data-bs-toggle="modal"
      data-bs-target="#LogInModal"
    >
      Log In
    </li>
  </ul>`;
};

loginButtons.forEach((element) => {
  element.addEventListener("click", login);
});
