let currentTrack = new Audio();

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

const updateHero = function (tracklist, ntraccia) {
  // Creazione del primo div e dell'immagine al suo interno
  let heroAlbum = document.createElement("div");
  heroAlbum.id = "heroAlbum";
  heroAlbum.classList.add("d-flex");

  let imgHeroTrack = document.createElement("img");
  imgHeroTrack.id = "imgHeroTrack";
  imgHeroTrack.src = tracklist[ntraccia].album.cover_big;
  imgHeroTrack.classList.add("grow-1");
  heroAlbum.appendChild(imgHeroTrack);
  let secondDiv = document.createElement("div");
  secondDiv.classList.add("d-flex");
  secondDiv.classList.add("flex-column");
  secondDiv.classList.add("px-3");
  secondDiv.classList.add("grow-1");
  secondDiv.classList.add("w-100");
  let innerDiv = document.createElement("div");
  innerDiv.classList.add("d-flex");
  innerDiv.classList.add("justify-content-between");
  let h5 = document.createElement("h5");
  h5.textContent = "ALBUM";
  let h6 = document.createElement("h6");
  h6.classList.add("text-secondary");
  h6.textContent = "NASCONDI ANNUNCI";

  innerDiv.appendChild(h5);
  innerDiv.appendChild(h6);
  secondDiv.appendChild(innerDiv);

  let h1 = document.createElement("h1");
  h1.id = "titoloHeaderTrack";
  h1.textContent = tracklist[ntraccia].title;
  secondDiv.appendChild(h1);

  let h5_2 = document.createElement("h5");
  h5_2.id = "artistHeaderTrack";
  secondDiv.appendChild(h5_2);

  let p = document.createElement("p");
  p.textContent =
    "Ascolta il nuovo " +
    tracklist[ntraccia].album.type +
    " di " +
    tracklist[ntraccia].artist.name;

  secondDiv.appendChild(p);

  let divButtons = document.createElement("div");
  divButtons.setAttribute(
    "class",
    "d-flex align-items-center gap-3 m-0 p-0 mx-5 my-3"
  );

  let heroPlay = document.createElement("button");
  heroPlay.setAttribute("id", "heroPlay");
  heroPlay.setAttribute("type", "button");
  heroPlay.setAttribute(
    "class",
    "btn rounded-pill fs-5 px-4 py-2 m-0 btn-primary"
  );
  heroPlay.textContent = "Play";
  heroPlay.addEventListener("click", function () {
    document.getElementById("buttonPlay").click();
  });

  divButtons.appendChild(heroPlay);

  let buttonSave = document.createElement("button");
  buttonSave.setAttribute("type", "button");
  buttonSave.setAttribute(
    "class",
    "btn rounded-pill fs-5 px-4 py-2 m-0 btn-outline-light text-white"
  );
  buttonSave.textContent = "Salva";
  divButtons.appendChild(buttonSave);

  let icon = document.createElement("i");
  icon.setAttribute("class", "bi bi-three-dots");
  divButtons.appendChild(icon);

  secondDiv.appendChild(divButtons);
  heroAlbum.appendChild(secondDiv);

  document.getElementById("heroContainer").innerHTML = ``;
  document.getElementById("heroContainer").appendChild(heroAlbum);
  document.getElementById("heroContainer").classList.add("w-100");
};

const isOnSpecificPage = function () {
  let pathname = window.location.pathname;
  return pathname.split("/").pop();
};

const audioPlayer = function (tracklist, index) {
  const mainDiv = document.createElement("div");
  mainDiv.classList.add("bg-tertiary");
  mainDiv.classList.add("d-flex");
  mainDiv.classList.add("align-items-center");

  currentTrack.src = tracklist[index].preview;
  currentTrack.id = "dinAudio";
  const buttonPrevious = document.createElement("button");
  buttonPrevious.innerHTML = `<i class="bi bi-rewind-circle-fill"></i>`;

  const buttonPlay = document.createElement("button");
  buttonPlay.id = "buttonPlay";
  buttonPlay.innerHTML = `<i class="bi bi-play-circle-fill"></i>`;

  const buttonNext = document.createElement("button");
  buttonNext.innerHTML = `<i class="bi bi-fast-forward-circle-fill"></i>`;

  if (isOnSpecificPage() === "index.html") {
    updateHero(tracklist, index);

    buttonPlay.addEventListener("click", () => {
      if (currentTrack.paused) {
        console.log("prova");
        currentTrack.play();
        buttonPlay.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
        document.getElementById("heroPlay").innerHTML = "Pausa";
      } else {
        currentTrack.pause();
        buttonPlay.innerHTML = `<i class="bi bi-play-circle-fill"></i>`;
        document.getElementById("heroPlay").innerHTML = "Play";
      }
    });
  }

  if (isOnSpecificPage() === "album.html") {
    let listaLinkCanzoni = document.querySelectorAll(".songtitle");

    for (let traccia = 0; traccia < listaLinkCanzoni.length; traccia++) {
      listaLinkCanzoni[traccia].classList.remove("text-primary");
      listaLinkCanzoni[traccia].classList.add("text-white");
    }

    listaLinkCanzoni[index].classList.remove("text-white");
    listaLinkCanzoni[index].classList.add("text-primary");

    buttonPlay.addEventListener("click", () => {
      if (currentTrack.paused) {
        currentTrack.play();
        buttonPlay.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
      } else {
        currentTrack.pause();
        buttonPlay.innerHTML = `<i class="bi bi-play-circle-fill"></i>`;
      }
    });
  }

  currentTrack.addEventListener("ended", () => {
    console.log("end");
    buttonPlay.innerHTML = `<i class="bi bi-play-circle-fill"></i>`;
    if (isOnSpecificPage() === "index.html") {
      document.getElementById("heroPlay").innerHTML = "Play";
    }
  });

  buttonPrevious.addEventListener("click", () => {
    currentTrack.pause();
    updatePlayBar(tracklist, index - 1);
  });

  buttonNext.addEventListener("click", () => {
    currentTrack.pause();
    updatePlayBar(tracklist, index + 1);
  });

  if (isOnSpecificPage() === "index.html") {
    mainDiv.classList.add("p-2");
    mainDiv.classList.add("container-fluid");
    mainDiv.classList.add("mx-0");
    mainDiv.classList.add("w-100");
    const mainRow = document.createElement("div");
    mainRow.classList.add("row");

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("col-4");
    buttonDiv.classList.add("d-flex");
    buttonDiv.classList.add("justify-content-center");

    buttonDiv.appendChild(buttonPrevious);
    buttonDiv.appendChild(buttonPlay);
    buttonDiv.appendChild(buttonNext);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("d-none");
    infoDiv.classList.add("d-md-flex");
    infoDiv.classList.add("col-4");
    const infoImg = document.createElement("img");
    infoImg.classList.add("grow-1");
    infoImg.style.objectFit = "contain";
    const divTitoli = document.createElement("div");
    divTitoli.classList.add("text-white");
    divTitoli.classList.add("d-flex");
    divTitoli.classList.add("flex-column");
    divTitoli.classList.add("position-relative");
    divTitoli.classList.add("ms-2");
    const infoArtist = document.createElement("a");
    infoArtist.style.fontSize = ".8rem";
    infoArtist.href = "./artist.html?artistId=" + tracklist[index].artist.id;
    infoArtist.innerText = tracklist[index].artist.name;
    const infoTrack = document.createElement("a");
    infoTrack.innerText = tracklist[index].title;
    infoTrack.href = "#";
    const infoAlbum = document.createElement("a");
    infoAlbum.style.fontSize = ".8rem";
    infoAlbum.href = "./album.html?albumId=" + tracklist[index].album.id;
    infoAlbum.innerText = tracklist[index].album.title;
    divTitoli.appendChild(infoArtist);
    divTitoli.appendChild(infoTrack);
    divTitoli.appendChild(infoAlbum);
    infoImg.src = tracklist[index].album.cover_small;
    infoDiv.appendChild(infoImg);
    infoDiv.appendChild(divTitoli);

    const divControlli = document.createElement("div");
    divControlli.classList.add("px-5");
    divControlli.classList.add("d-none");
    divControlli.classList.add("d-md-flex");
    divControlli.classList.add("col-4");
    divControlli.classList.add("justify-content-end");
    const volumeControl = document.createElement("input");
    volumeControl.type = "range";
    volumeControl.id = "volumeControl";
    volumeControl.addEventListener("input", function () {
      currentTrack.volume = this.value / 100;
    });
    divControlli.appendChild(volumeControl);
    volumeControl.value = 50;
    mainDiv.appendChild(infoDiv);
    mainDiv.appendChild(buttonDiv);
    mainDiv.appendChild(divControlli);
  }

  if (isOnSpecificPage() === "album.html") {
    let listaLinkCanzoni = document.querySelectorAll(".songtitle");

    for (let traccia = 0; traccia < listaLinkCanzoni.length; traccia++) {
      listaLinkCanzoni[traccia].classList.remove("text-primary");
      listaLinkCanzoni[traccia].classList.add("text-white");
    }
    listaLinkCanzoni[index].classList.remove("text-white");
    listaLinkCanzoni[index].classList.add("text-primary");

    mainDiv.classList.remove("bg-tertiary", "align-items-center");
    buttonPlay.classList.add(
      "btn",
      "btn-primary",
      "rounded-circle",
      "fs-3",
      "mx-4",
      "text-dinamic"
    );
    buttonPlay.innerHTML = `<i class="bi bi-caret-right-fill"></i>`;

    buttonNext.classList.add(
      "btn",
      "btn-body",
      "rounded-circle",
      "fs-3",
      "text-dinamic"
    );
    buttonNext.innerHTML = `<i class="bi bi-fast-forward-fill"></i>`;

    buttonPrevious.classList.add(
      "btn",
      "btn-body",
      "rounded-circle",
      "fs-3",
      "text-dinamic"
    );
    buttonPrevious.innerHTML = `<i class="bi bi-rewind-fill"></i>`;

    mainDiv.appendChild(buttonPrevious);
    mainDiv.appendChild(buttonPlay);
    mainDiv.appendChild(buttonNext);
  }

  if (isOnSpecificPage() === "artist.html") {
    let listaLinkCanzoni = document.querySelectorAll(".songtitle");

    for (let traccia = 0; traccia < listaLinkCanzoni.length; traccia++) {
      listaLinkCanzoni[traccia].classList.remove("text-primary");
      listaLinkCanzoni[traccia].classList.add("text-white");
    }

    listaLinkCanzoni[index].classList.remove("text-white");
    listaLinkCanzoni[index].classList.add("text-primary");

    mainDiv.classList.remove("bg-tertiary", "align-items-center");
    buttonPlay.classList.add(
      "btn",
      "btn-primary",
      "rounded-circle",
      "fs-3",
      "mx-4",
      "text-dinamic"
    );
    buttonPlay.innerHTML = `<i class="bi bi-caret-right-fill"></i>`;
    buttonPlay.addEventListener("click", () => {
      if (currentTrack.paused) {
        currentTrack.play();
        buttonPlay.innerHTML = `<i class="bi bi-pause-circle-fill"></i>`;
      } else {
        currentTrack.pause();
        buttonPlay.innerHTML = `<i class="bi bi-play-circle-fill"></i>`;
      }
    });

    buttonNext.classList.add(
      "btn",
      "btn-body",
      "rounded-circle",
      "fs-3",
      "text-dinamic"
    );
    buttonNext.innerHTML = `<i class="bi bi-fast-forward-fill"></i>`;

    buttonPrevious.classList.add(
      "btn",
      "btn-body",
      "rounded-circle",
      "fs-3",
      "text-dinamic"
    );
    buttonPrevious.innerHTML = `<i class="bi bi-rewind-fill"></i>`;

    mainDiv.appendChild(buttonPrevious);
    mainDiv.appendChild(buttonPlay);
    mainDiv.appendChild(buttonNext);
  }
  currentTrack.play();
  currentTrack.volume = 0.2;
  return mainDiv;
};

export { audioPlayer, currentTrack };
