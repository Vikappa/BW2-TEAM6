let artistNames = document.querySelectorAll('.artist-name');

artistNames.forEach(artist => {
    artist.addEventListener('click', function (event) {
        event.preventDefault();

        let artistId = this.dataset.id;

        window.location.href = `artist.html?id=${artistId}`;
    });
});


let params = new URLSearchParams(window.location.search);
let artistId = params.get('artistId');

    // Fetch 
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`)
    .then((response) => {
        if (response.ok) {
            console.log(response);
            return response.json();
        }
    })
    .then(artist => {
        console.log(artist);
        const artistDetailsContainer = document.querySelector(".artist-details");
        artistDetailsContainer.innerHTML = `
        <h1>${artist.name}</h1>
            <img src="${artist.picture}">
            <p>${artist.nb_album}</p>
            <p>${artist.nb_fan}</p>
            <p>${artist.radio}</p>
            <p>${artist.tracklist}</p>  
            <p>${artist.type}</p>
        `;
    })
    .catch(error => console.log('Error fetching artist', error));
