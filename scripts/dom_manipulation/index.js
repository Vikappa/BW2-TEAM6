// IMPORT


// VARIABILI UNICHE DELLA CLASSE
let currentUser = "User"

// METODI LISTENER 


// UTILITY
function isValidUser(userValue) {
    if(userValue !== "User" && userValue === true && userValue !== "login"){
        return true
    } else {
        return false
    }
}

// DOM MANIPULATION

const setLoginForm = function() {
    const containerFluid = document.createElement('div')
    const divP1 = document.createElement('div')
    const button = document.createElement('button')
    const img = document.createElement('img')
    const span = document.createElement('span')
    const ul = document.createElement('ul')
    const li = document.createElement('li')
    const divFlex = document.createElement('div')
    const input = document.createElement('input')
    const loginButton = document.createElement('button')
    const icon = document.createElement('i')
    containerFluid.className = 'container-fluid p-0 m-0'
    divP1.className = 'p-1 d-flex align-items-center justify-content-center'
    button.className = 'btn btn-outline-light rounded-pill p-1 px-3 col- d-flex align-items-center justify-content-center gap-1 text-align-start'
    button.setAttribute('style', 'max-width: 60vw !important;')
    button.setAttribute('type', 'button')
    button.setAttribute('data-bs-toggle', 'dropdown')
    button.setAttribute('aria-expanded', 'false')
    img.setAttribute('src', './assets/icons/person-circle.svg')
    span.className = 'text-light'
    span.textContent = 'Login'
    ul.className = 'dropdown-menu dropdown-menu-login p-1 rounded-3'
    divFlex.className = 'd-flex align-items-center'
    input.className = 'form-control form-control-sm'
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', 'Inserisci nome utente')
    input.setAttribute('aria-label', '.form-control-sm example')
    loginButton.className = 'btn btn-sm btn-primary text-light'
    loginButton.setAttribute('type', 'button')
    icon.className = 'bi bi-person-check-fill'
    button.appendChild(img)
    button.appendChild(span)
    divFlex.appendChild(input)
    divFlex.appendChild(loginButton)
    loginButton.appendChild(icon)
    li.appendChild(divFlex)
    ul.appendChild(li)
    divP1.appendChild(button)
    divP1.appendChild(ul)
    containerFluid.appendChild(divP1)
    document.getElementById('navBarLogin').appendChild(containerFluid)
}


const login = function(user) {
    console.log("Utente valido:", user)
  }

const updateUser = function () {
    currentUser = JSON.parse(sessionStorage.getItem("CFy_CurrentUser"))
  
    if (currentUser !== null && isValidUser(currentUser)) {

      login(currentUser)

    } else {
        setLoginForm()
    }
}
  

  

  



// LISTENER DOM


// INIZIO ESECUZIONE
updateUser()