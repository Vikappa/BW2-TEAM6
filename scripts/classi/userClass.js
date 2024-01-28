class User {
    constructor(nome, img, arrayArtistiPiaciuti = [], arrayTrackPiaciute = [], arrayUltimeRicerche = [], arrayAlbumVisualizzati = [], arrayPlaylistPersonali = []) {
        this.nome = nome
        this.img = img
        if (!img) {
            this.img = `../assets/icons/person-circle.svg`
        }
        this.arrayArtistiPiaciuti = arrayArtistiPiaciuti
        this.arrayTrackPiaciute = arrayTrackPiaciute
        this.arrayUltimeRicerche = arrayUltimeRicerche
        this.arrayAlbumVisualizzati = arrayAlbumVisualizzati
        this.arrayPlaylistPersonali = arrayPlaylistPersonali
    }
}

export { User }