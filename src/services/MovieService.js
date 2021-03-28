import AccountService from "./AccountService";
import BaseService from "./BaseService"

class MovieService {

    static async getById(id) {
        return fetch('http://localhost:8081/movies/' + id,
            {
                headers: {
                    Authorization: AccountService.getToken()
                }
            })
            .then(BaseService.handleError);
    }


    static async getSessions(id) {
        return fetch(BaseService._baseUrl+'/movies/' + id + '/sessions',
            {
                headers: {
                    Authorization: AccountService.getToken()
                }
            })
            .then(BaseService.handleError);
    }

    static async getPageAmountForQuery(perPage, genre, title) {
        return fetch(BaseService._baseUrl + '/movies/pages/' + perPage + '?genre=' + genre + '&title=' + title,
            {
                headers: {
                    Authorization: AccountService.getToken()
                }
            })
            .then(BaseService.handleError);
    }

    static async getMoviesForQuery(page, perPage, genre, title) {
        return fetch(BaseService._baseUrl + '/movies?page=' + page + '&perPage=' + perPage + '&genre=' + genre + '&title=' + title,
            {
                headers: {
                    Authorization: AccountService.getToken()
                }
            })
            .then(BaseService.handleError);
    }

    static async getTitles() {
        return fetch('http://localhost:8081/movies/titles',
            {
                headers: {
                    Authorization: AccountService.getToken()
                }
            })
            .then(BaseService.handleError);
    }

    static addMovie= async (movie) =>{
        console.log("MovieService.addMovie(movie):");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' , Authorization: AccountService.getToken()},
            body: JSON.stringify(movie),
        };
        return fetch(BaseService._baseUrl+'/movies', requestOptions)
            .then(response => {
                if (!response.ok) {
                    BaseService.handleResponseError(response);
                }
                return response;
            })
            .catch(error => {
                BaseService.handleError(error);
            });
    };
    static deleteMovie= async (id) =>{
        console.log("MovieService.deleteMovie(id):");
        console.log("id: " + id);
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', Authorization: AccountService.getToken()}
        };
        return fetch(BaseService._baseUrl+'/movies/' + id, requestOptions)
            .then(response => {
                if (!response.ok) {
                    BaseService.handleResponseError(response);
                }
                return response.json();
            })
            .catch(error => {
                BaseService.handleError(error);
            });
    };
    static updateMovie= async (id, movie) =>{
        console.log("MovieService.updateMovie(id, movie):");
        console.log("id: " + id);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' ,
                Authorization: AccountService.getToken()},
            body: JSON.stringify(movie)
        };
        return fetch(BaseService._baseUrl+'/movies/' + id, requestOptions)
            .then(response => {
                if (!response.ok) {
                    BaseService.handleResponseError(response);
                }
                return response;
            })
            .catch(error => {
                BaseService.handleError(error);
            });
    };
    static blockMovie= async (id) =>{
        console.log("MovieService.blockMovie(id):");
        console.log("id: " + id);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' ,
                Authorization: AccountService.getToken()}
        };
        return fetch(BaseService._baseUrl+'/movies/block/' + id, requestOptions)
            .then(response => {
                if (!response.ok) {
                    BaseService.handleResponseError(response);
                }
                return response;
            })
            .catch(error => {
                BaseService.handleError(error);
            });
    };
    static unblockMovie= async (id) =>{
        console.log("MovieService.unblockMovie(id):");
        console.log("id: " + id);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' ,
                Authorization: AccountService.getToken()}
        };
        return fetch(BaseService._baseUrl+'/movies/unblock/' + id, requestOptions)
            .then(response => {
                if (!response.ok) {
                    BaseService.handleResponseError(response);
                }
                return response;
            })
            .catch(error => {
                BaseService.handleError(error);
            });
    };
    static async getAll() {
        console.log("MovieService.getAll():");
        return fetch(BaseService._baseUrl+'/movies/all',{
            headers: {
                Authorization: AccountService.getToken()
            }})
            .then(response => {
                if (!response.ok) {
                    BaseService.handleResponseError(response);
                }
                return response.json();
            })
            .catch(error => {
                BaseService.handleError(error);
            });
    }
    static async getBlocked() {
        console.log("MovieService.getBlocked():");
        return fetch(BaseService._baseUrl+'/movies/blocked',{
            headers: {
                Authorization: AccountService.getToken()
            }})
            .then(response => {
                if (!response.ok) {
                    BaseService.handleResponseError(response);
                }
                return response.json();
            })
            .catch(error => {
                BaseService.handleError(error);
            });
    }
}
export default MovieService;