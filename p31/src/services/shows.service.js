import { UrlConfig } from '../../src/assets/configuration/config'

let baseurl = UrlConfig.baseurl;
export default class ShowService {

    getPosts() {
        return axios.get(baseurl + "post");
    }

    getGenre() {
        return axios.get(baseurl + "genre");
    }

    getPostByGenre(Id) {
        if (Id == 0) {
            return axios.get(baseurl + "post");
        } else {
            return axios.get(baseurl + "post?nGenreId=" + Id);
        }
    }

    getPostById(Id) {
        return axios.get(baseurl + "post?id=" + Id);

    }
    getArtistById(Id) {
        return axios.get(baseurl + "artist?nArtistId=" + Id);
    }

    getArtistByGenre(Id) {
        return axios.get(baseurl + "artist?nGenreId=" + Id);
    }

    saveShow(objRequest) {
        return axios.post(baseurl + "post", objRequest);
    }

    getFaqs() {
        return axios.get(baseurl + "faq");
    }

    getArtist() {
        return axios.get(baseurl + "artist");
    }
}