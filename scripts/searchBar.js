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

const searchBar = function () {
    const divContainer = document.createElement('div')
    divContainer.id = "containerRicerca"

    const input = document.createElement('input')
    input.type = 'text'
    input.className = 'form-control'
    input.id = 'inputRicerca'
    input.placeholder = 'Cerca..'

    divContainer.appendChild(input)

    return divContainer
}
document.addEventListener('click', function (event) {
    const input = document.getElementById('inputRicerca')
    const divContainer = document.getElementById('containerRicerca')

    if (input && divContainer && document.body.contains(divContainer)) {
        if (event.target !== input && !input.contains(event.target)) {
            console.log('Cliccato fuori dall\'input')
            ripristino()
        }
    }
}, true)






export { searchBar }