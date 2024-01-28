// IMPORT
import { User } from '../classi/userClass.js'
import { fetchJSONUsers } from '../fetchJSON/fetch_utenti_mockup.js'

// VARIABILI UNICHE DELLA CLASSE
let currentUser = "User"
let loadedUsers = []
const albumDaSuggerire = []
const artistiDaSuggerire = []
const playstDaSuggerire = []
const trackDegliAltri = []
 
// METODI LISTENER 

const settaDirezioneDropDown = function () { // Imposta la direzione del dropdown in base alla dimensione dello schermo
    const dropdownDiv = document.getElementById('navDropLogin')
    if (window.innerWidth >= 768) {
        dropdownDiv.classList.add('dropstart')
        dropdownDiv.classList.remove('dropdown')
    } else {
        dropdownDiv.classList.add('dropdown')
        dropdownDiv.classList.remove('dropstart')
    }
}



// UTILITY
function isValidUser(userValue) {
    if(userValue !== "User" && userValue === true && userValue !== "login"){
        return true
    } else {
        return false
    }
}



// DOM MANIPULATION

const setLoginForm = function(arrayUser) { //Imposta la navBar col form per l'iscrizione e gli utenti esistenti
    const outerDiv = document.createElement('div')
    outerDiv.className = 'container-fluid p-0 p-md-2 m-0'

    const buttonDiv = document.createElement('div')
    buttonDiv.className = 'd-none d-md-inline m-1'

    // Funzione per creare un bottone con icona
    const createButton = (iconClass) => {
        const button = document.createElement('button')
        button.setAttribute('type', 'button')
        button.className = 'btn btn-outline-secondary p-1 rounded-circle'

        const icon = document.createElement('i')
        icon.className = iconClass
        button.appendChild(icon)
        return button
    }
const prevButton = document.createElement('button')
prevButton.setAttribute('type', 'button')
prevButton.className = 'btn btn-outline-secondary p-1 rounded-circle mx-3 '
const nextButton = document.createElement('button')
nextButton.setAttribute('type', 'button')
nextButton.className = 'btn btn-outline-secondary p-1 rounded-circle mx-3 '
const innerPrev = document.createElement('i')
const innerNext = document.createElement('i')
innerPrev.innerHTML = `<i class="bi bi-chevron-left p-1 m-0 "></i>`
innerNext.innerHTML = `<i class="bi bi-chevron-right p-1 m-0 "></i>`
prevButton.appendChild(innerPrev)
nextButton.appendChild(innerNext)

    buttonDiv.appendChild(prevButton)
    buttonDiv.appendChild(nextButton)

    outerDiv.appendChild(buttonDiv)

    const dropdownDiv = document.createElement('div')
    dropdownDiv.className = 'p-1 d-flex align-items-center justify-content-center dropstart'
dropdownDiv.id = 'navDropLogin'
    const dropdownButton = document.createElement('button')
    dropdownButton.setAttribute('type', 'button')
    dropdownButton.className = 'btn btn-outline-light rounded-pill p-1 px-3 col- d-flex align-items-center justify-content-center gap-1 text-align-start'
    dropdownButton.setAttribute('data-bs-toggle', 'dropdown')
    dropdownButton.setAttribute('aria-expanded', 'false')
    dropdownButton.style.maxWidth = '60vw !important'

    const img = document.createElement('img')
    img.src = './assets/icons/person-circle.svg'
    dropdownButton.appendChild(img)

    const span = document.createElement('span')
    span.textContent = 'Login'
    dropdownButton.appendChild(span)

    dropdownDiv.appendChild(dropdownButton)

    const dropdownMenu = document.createElement('ul')
    dropdownMenu.className = 'dropdown-menu dropdown-menu-login p-1 rounded-3'

    

    const listItemInputDiv = document.createElement('li')


    const inputDiv = document.createElement('div')
    inputDiv.className = 'd-flex align-items-center'

    const input = document.createElement('input')
    input.className = 'form-control form-control-sm'
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', 'Nome utente')
    input.setAttribute('aria-label', '.form-control-sm example')

    const loginButton = document.createElement('button')
    loginButton.setAttribute('type', 'button')
    loginButton.className = 'btn btn-sm btn-primary text-light m-0 p-0 px-1'
    const loginIcon = document.createElement('i')
    loginIcon.className = 'bi bi-person-add p-0 m-0 fs-5'
    loginButton.appendChild(loginIcon)

    inputDiv.appendChild(input)
    inputDiv.appendChild(loginButton)
    listItemInputDiv.appendChild(inputDiv)

    const listItemUserLi = function(user) {
        const listItem = document.createElement('li')
        listItem.className = 'd-flex align-items-center bg-dark'
        const userImg = document.createElement('img')
        userImg.className = 'rounded-circle img-fluid m-0 p-0'
        userImg.src = user.img
        userImg.style.width = '20px'
    userImg.style.height = '20px'
        listItem.appendChild(userImg)
        const userLi = document.createElement('a')
        userLi.className = 'dropdown-item text-white fs-6 m-0 p-0 customLiHover'
        userLi.setAttribute('href', '#')
        userLi.textContent = user.nome
        listItem.appendChild(userLi)

        return listItem
    }

for (let indiceUtenti = 0; indiceUtenti < arrayUser.length; indiceUtenti++) {
    dropdownMenu.appendChild(listItemUserLi(arrayUser[indiceUtenti]))
}

    dropdownMenu.appendChild(listItemInputDiv)

    dropdownDiv.appendChild(dropdownMenu)
    outerDiv.appendChild(dropdownDiv)
    document.getElementById('navBar').appendChild(outerDiv)
}



const login = function(user) {
    console.log("Utente valido:", user)
  }

const updateUser = function (arrayUser) {
    currentUser = JSON.parse(sessionStorage.getItem("CFy_CurrentUser"))
  
    if (currentUser !== null && isValidUser(currentUser)) {

      login(currentUser)

    } else {
        setLoginForm(arrayUser)
    }
}
  



// LISTENER DOM
window.addEventListener('resize', settaDirezioneDropDown)//Cambia la classe dropdown dropstar alla navbar in base alla larghezza dello schermo


// INIZIO ESECUZIONE


fetchJSONUsers()
.then(arrayUser => {
    updateUser(arrayUser) // Mette sullo schermo il pulsante per il login
settaDirezioneDropDown() // Modifica il pulsante per il login, necessario usare dopo
})
.catch(error => {
    console.error('Errore durante il caricamento degli utenti:', error)
})