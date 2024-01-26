class User {
    constructor(nome, img, arrayArtisti = [], arrayPiaciute = [], arrayUltimeRicerche = [], arrayUltimiAlbum = [], arrayPlaylist = []) {
        this.nome = nome
        this.img = img
        if (!img) {
            this.img = `../assets/icons/person-circle.svg`
        }
        this.arrayArtisti = arrayArtisti
        this.arrayPiaciute = arrayPiaciute
        this.arrayUltimeRicerche = arrayUltimeRicerche
        this.arrayUltimiAlbum = arrayUltimiAlbum
        this.arrayPiaciute = arrayPiaciute
    }
}

export { User }