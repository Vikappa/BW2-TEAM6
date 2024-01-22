fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=Trending", {
    headers: {}
})
    .then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('errore nella chiamata')
        }
    })
    .then((data) => {
        console.log(data.data)
    }
    )
    .catch((err) => {
        console.log(err)
    })