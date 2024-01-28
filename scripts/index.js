// IMPORT
import { audioPlayer } from "./audioplayer.js";
import { searchAlbum } from "./searchAlbumQuery.js";
import { searchBar } from "./searchBar.js";
import { User } from './userClass.js'


// UTILITY
document.getElementById("closeRightBar").addEventListener("click", function () {
  document.getElementById("barraDestra").classList.add("closing");

});

const updateUtente = function (userToSet) {
  if (userToSet) {
    sessionStorage.setItem("user", JSON.stringify(userToSet))
  }



}//

function showErrorModal(title, message) {
  document.getElementById('errorModalTitle').textContent = title;
  document.getElementById('errorModalBody').textContent = message;
  let errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
  errorModal.show();
}

let loadedAccounts = JSON.parse(localStorage.getItem("_fs0723cfUserName_")) || [];

//ACCOUNTS

const addAccount = function () {
  let modaleRegistrazione = new bootstrap.Modal(document.getElementById('registerModal'));
  modaleRegistrazione.show()


  let logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", logout);

  document.getElementById('addUserForm').addEventListener('submit', function (event) {
    event.preventDefault()

    let username = document.getElementById('newUsername').value
    let imgSrc = document.getElementById('newUserImg').value

    let esisteUtente = false

    for (let i = 0; i < loadedAccounts.length; i++) {
      if (loadedAccounts[i].nome === username) {
        esisteUtente = true
        break
      }
    }

    if (!esisteUtente) {
      let nuovoUtente = new User(username, imgSrc);

      loadedAccounts.push(nuovoUtente);

      localStorage.setItem("_fs0723cfUserName_", JSON.stringify(loadedAccounts))
      modaleRegistrazione.hide();
      document.getElementById('wrapperUtentiModale').innerHTML = ''
      document.getElementById('wrapperUtentiModale').innerHTML = htmlListaUtentiDinamico()
      document.getElementById('addAccount').addEventListener('click', addAccount)
      let listaBottoniUtenti = document.querySelectorAll('.userButton')
      for (let iUtente = 0; iUtente < listaBottoniUtenti.length; iUtente++) {
        const element = listaBottoniUtenti[iUtente]
        element.addEventListener('click', function (e) {
          let nameToInsert = e.target.innerText;
          updateUtente(nameToInsert)
          let picToInsert
          if (e.target.getElementsByTagName("img")[0].src) {
            picToInsert = e.target.getElementsByTagName("img")[0].src
          }
          const userObj = { nameToInsert, picToInsert };
          dinamicUser.innerHTML = `<button
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
        </ul>`
        }

        )


        let logoutButton = document.getElementById("logoutButton");


        logoutButton.addEventListener("click", logout);
      }

    } else {
      showErrorModal("Errore", "Un utente con questo nome esiste già.")
    }

  })
}


const updatePlayBar = function (tracklist, trackIndex) {
  document.getElementById("playBar").innerHTML = ``;
  document
    .getElementById("playBar")
    .appendChild(audioPlayer(tracklist, trackIndex));
};
export { updatePlayBar }

const isOnSpecificPage = function () {
  let pathname = window.location.pathname;
  return pathname.split("/").pop();
};


// LISTA UTENTI DINAMICA
sessionStorage.clear()
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


  let stringaUtenteGettato = ``

  let usersArray = JSON.parse(localStorage.getItem("_fs0723cfUserName_"))
  if (usersArray) {
    for (let ggg = 0; ggg < usersArray.length; ggg++) {
      stringaUtenteGettato = stringaUtenteGettato +
        `<button "
  class="btn btn-dark userButton text-white rounded-pill p-1 d-flex align-items-center gap-1 loginButton"
  type="button" aria-expanded="false" data-bs-dismiss="modal">
  <img src="${usersArray[ggg].img}" class="rounded-circle" height="30px"
    width="30px" />
  ${usersArray[ggg].nome}
  </button>`
    }
  }

  let stringaButtonAdd = `<button id = "addAccount" onclick="addAccount"
  class="btn btn-dark text-white rounded-pill p-1 d-flex align-items-center gap-1 loginButton"
  type="button" aria-expanded="false" data-bs-dismiss="modal">
  <i class="bi bi-sign-intersection"></i>
  Crea Utente
</button>
  </button>`

  let logout = function () {

  }

  let logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", logout);
  return stringaIniziale + stringaUtenteGettato + stringaButtonAdd
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
  if (isOnSpecificPage() ==! "album.html" && isOnSpecificPage() ==! "artist.html") {
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


const logout = function () {
  sessionStorage.removeItem("user");
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
  let logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", logout);
};

const ifAlreadyLogged = function () {
  document.getElementById('wrapperUtentiModale').innerHTML = htmlListaUtentiDinamico()
  document.getElementById('addAccount').addEventListener('click', addAccount)
  let listaBottoniUtenti = document.querySelectorAll('.userButton')
  for (let iUtente = 0; iUtente < listaBottoniUtenti.length; iUtente++) {
    const element = listaBottoniUtenti[iUtente]
    element.addEventListener('click', function (e) {
      const nameToInsert = e.target.innerText;
      updateUtente(nameToInsert)
      const picToInsert = e.target.getElementsByTagName("img")[0].src
      const userObj = { nameToInsert, picToInsert }
      dinamicUser.innerHTML = `<button
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


      let logoutButton = document.getElementById("logoutButton");
      logoutButton.addEventListener("click", logout);
    })

  }


  if (sessionStorage.getItem("user")) {
    const userData = JSON.parse(sessionStorage.getItem("user"));
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
    let logoutButton = document.getElementById("logoutButton");

    logoutButton.addEventListener("click", logout);
  }
};

ifAlreadyLogged()

loginButtons.forEach((element) => {
  element.addEventListener("click", login);
})
