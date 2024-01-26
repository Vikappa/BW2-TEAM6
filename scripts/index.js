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
// LISTA UTENTI DIINAMICA

const htmlListaUtentiDinamico = function () {
  let stringaIniziale = `
<button
class="btn btn-dark userButton text-white rounded-pill p-1 d-flex align-items-center gap-1 loginButton"
type="button" aria-expanded="false" data-bs-dismiss="modal">
<img src="./assets/media/imgs/placeholder/IMG-Fabio.jpg" class="rounded-circle" height="30px"
  width="30px" />
Fabio Gilardi
</button>
<button
class="btn btn-dark userButton text-white rounded-pill p-1 d-flex align-items-center gap-1 loginButton"
type="button" aria-expanded="false" data-bs-dismiss="modal">
<img src="./assets/media/imgs/placeholder/foto Giuseppe.jpg" class="rounded-circle" height="30px"
  width="30px" />
Giuseppe Averna
</button>
<button
class="btn btn-dark userButton text-white rounded-pill p-1 d-flex align-items-center gap-1 loginButton"
type="button" aria-expanded="false" data-bs-dismiss="modal">
<img src="./assets/media/imgs/placeholder/img-francesco.jpeg" class="rounded-circle" height="30px"
  width="30px" />
Francesco Sileoni
</button>
<button
class="btn btn-dark userButton text-white rounded-pill p-1 d-flex align-items-center gap-1 loginButton"
type="button" aria-expanded="false" data-bs-dismiss="modal">
<img src="./assets/media/imgs/placeholder/img-ermias.jpeg" class="rounded-circle" height="30px"
  width="30px" />
Ermias De Angeli
</button>
</div>`


  let arrayUtenti = localStorage.getItem("_fs0723cfUserName_");

  // Inizializza una variabile per memorizzare l'oggetto parsato
  let parsedValue;

  if (arrayUtenti) {
    try {
      // Prova a parsare il valore come JSON
      parsedValue = JSON.parse(arrayUtenti)
    } catch (e) {
      // Gestisci eventuali errori di parsing
      console.error("Errore nel parsing del JSON: ", key)
    }
  } else {
    console.log("Chiave utenti non trovata")
  }

  //   <button
  // class="btn btn-dark userButton text-white rounded-pill p-1 d-flex align-items-center gap-1 loginButton"
  // type="button" aria-expanded="false" data-bs-dismiss="modal">
  // <img src="./assets/media/imgs/placeholder/currentuser.jpg" class="rounded-circle" height="30px"
  //   width="30px" />
  // Vincenzo Costantini
  // </button >

  // Mostra l'oggetto parsato
  console.log(parsedValue);

  let stringaUtenteGettato = `<button
class="btn btn-dark userButton text-white rounded-pill p-1 d-flex align-items-center gap-1 loginButton"
type="button" aria-expanded="false" data-bs-dismiss="modal">
<img src="./assets/media/imgs/placeholder/img-ermias.jpeg" class="rounded-circle" height="30px"
  width="30px" />
Ermias De Angeli
</button>`

  let stringaButtonAdd = `<button
  class="btn btn-dark userButton text-white rounded-pill p-1 d-flex align-items-center gap-1 loginButton"
  type="button" aria-expanded="false" data-bs-dismiss="modal">
  <i class="bi bi-sign-intersection"></i>
  Crea Utente
</button>
  </button>`

  return stringaIniziale + stringaButtonAdd
}

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
    .then((arrayRitorno) => { })
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
  console.log(logi)
  console.log(e.target);
  const nameToInsert = e.target.innerText;
  const picToInsert = e.target.getElementsByTagName("img")[0].src;
  const userObj = { nameToInsert, picToInsert };
  localStorage.setItem("user", JSON.stringify(userObj));
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
  localStorage.removeItem("user");
  dinamicUser.innerHTML = `
    <button
    class="btn btn-dark userButton text-white dropdown-toggle rounded-pill p-1 d-flex align-items-center gap-1"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
  <i class="bi bi-person-circle"></i>
    Accedi
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

const ifAlreadyLogged = function () {
  document.getElementById('wrapperUtentiModale').innerHTML = htmlListaUtentiDinamico()

  if (localStorage.getItem("user")) {
    const userData = JSON.parse(localStorage.getItem("user"));
    dinamicUser.innerHTML = `
  <button
  class="btn btn-dark userButton text-white dropdown-toggle rounded-pill p-1 d-flex align-items-center gap-1"
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
  }
};

ifAlreadyLogged();

loginButtons.forEach((element) => {
  element.addEventListener("click", login);
});

