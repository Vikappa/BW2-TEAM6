import { searchAlbum } from './searchAlbumQuery.js'

const ripristino = function () {
    document.getElementById('inputRicerca').remove()
    document.getElementById('cercaLi').innerHTML = `<a class="nav-link " href="#" id="cercaAnchor">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
      viewBox="0 0 16 16">
      <path
        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
    </svg>Cerca</a>`

    document.getElementById("cercaAnchor").addEventListener('click', () => {
        document.getElementById("cercaAnchor").remove()
        document.getElementById('cercaLi').appendChild(searchBar())
    })
}

const updateRisultatiRicerca = function () {
    let queryToSearch = document.getElementById('inputRicerca').value

    if (queryToSearch.length >= 3) {
        searchAlbum(queryToSearch)
            .then(result => {
                console.log(result)

                if (document.getElementById('ulDropDown')) {
                    document.getElementById('ulDropDown').remove()
                }

                if (result.length === 0) {
                    if (document.getElementById('ulDropDown')) {
                        document.getElementById('ulDropDown').remove()
                    }
                } else {
                    const ulDropDown = document.createElement('ul')
                    ulDropDown.id = "ulDropDown"
                    ulDropDown.classList.add('dropdown-menu')
                    ulDropDown.classList.add('show')
                    ulDropDown.classList.add('p-0')
                    ulDropDown.classList.add('m-0')
                    ulDropDown.classList.add('d-flex')
                    ulDropDown.classList.add('flex-column')

                    for (let index = 0; index < 10; index++) {
                        const newLiDropDown = document.createElement('li')
                        newLiDropDown.classList.add('p-0')
                        newLiDropDown.classList.add('m-0')
                        newLiDropDown.classList.add('d-flex')
                        newLiDropDown.classList.add('liRicerca')

                        const divRisultato = document.createElement('div')
                        divRisultato.classList.add('d-flex')
                        divRisultato.classList.add('p-2')

                        const imgRisultato = document.createElement('img')
                        imgRisultato.src = result[index].album.cover_small
                        imgRisultato.classList.add('imgSearchBar')
                        imgRisultato.classList.add('p-1')
                        divRisultato.appendChild(imgRisultato)

                        const divTitoli = document.createElement('div')
                        divTitoli.classList.add('d-flex')
                        divTitoli.classList.add('flex-column')
                        divTitoli.classList.add('p-0')
                        divTitoli.classList.add('m-0')
                        divTitoli.classList.add('grow-1')


                        const titolo = document.createElement('a')
                        titolo.classList.add('p-0')
                        titolo.classList.add('m-0')
                        titolo.style.fontSize = "1rem"
                        titolo.innerHTML = result[index].title
                        if (titolo.innerHTML.length > 15) {
                            titolo.innerHTML = titolo.innerHTML.substring(0, 12) + '...'
                        }

                        const artista = document.createElement('a')
                        artista.classList.add('p-0')
                        artista.classList.add('m-0')
                        artista.href = 'album.html?albumId=' + result[index].album.id
                        artista.style.fontSize = ".8rem"
                        artista.innerHTML = result[index].artist.name

                        const album = document.createElement('a')
                        album.classList.add('p-0')
                        album.classList.add('m-0')
                        album.style.fontSize = ".8rem"
                        album.innerHTML = result[index].album.title

                        divTitoli.appendChild(artista)
                        divTitoli.appendChild(titolo)
                        divTitoli.appendChild(album)

                        divRisultato.appendChild(divTitoli)

                        newLiDropDown.appendChild(divRisultato)

                        ulDropDown.appendChild(newLiDropDown)

                    }

                    document.getElementById('cercaLi').appendChild(ulDropDown)

                }
            })
            .catch(error => {
                console.error('Si è verificato un errore nella casella di ricerca:', error)
            })
    } else {
        if (document.getElementById('ulDropDown')) {
            document.getElementById('ulDropDown').remove()
        }
    }


}


const searchBar = function () {
    const divContainer = document.createElement('div')
    divContainer.id = "containerRicerca"

    const input = document.createElement('input')
    input.type = 'text'
    input.className = 'form-control'
    input.id = 'inputRicerca'
    input.placeholder = 'Cerca..'
    input.autocomplete = 'off'

    input.addEventListener('input', updateRisultatiRicerca)

    divContainer.appendChild(input)

    return divContainer
}
document.addEventListener('click', function (event) {
    const input = document.getElementById('inputRicerca')
    const divContainer = document.getElementById('containerRicerca')

    if (input && divContainer && document.body.contains(divContainer)) {
        if (event.target !== input && !input.contains(event.target)) {
            ripristino()
        }
    }
}, true)






export { searchBar }