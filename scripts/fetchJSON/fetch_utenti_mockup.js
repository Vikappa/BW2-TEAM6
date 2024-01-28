import { User } from '../classi/userClass.js'
export function fetchJSONUsers() {
    return fetch('../utenti_mockup/utenti_mockup.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore di rete nella risposta')
            }
            return response.json()
        })
        .then(data => {
            let arrayUserRitorno = []
            for (let index = 0; index < data.array_user.length; index++) {
                let userLetto = new User(
                    data.array_user[index].nome,
                    data.array_user[index].img,
                    data.array_user[index].array_artisti_piaciuti,
                    data.array_user[index].array_canzoni_piaciute,
                    data.array_user[index].array_ultime_ricerche,
                    data.array_user[index].array_album_visualizzati,
                )
                arrayUserRitorno.push(userLetto)
            }
            return arrayUserRitorno
        })
}

