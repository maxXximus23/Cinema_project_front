import BaseService from "./BaseService"

class MovieService {

    static async getById(id) {
        return fetch('http://localhost:8081/movies/' + id,
            {
                headers: {
                    "Authorization": "Bearer_" + JSON.parse(localStorage.getItem("userCredentials")).token
                }
            })
            .then(BaseService.handleError);
    }


    static addMovie= async (movie) =>{
        console.log("MovieService.addMovie(movie):");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movie)
        };
        return fetch(BaseService._baseUrl+'/movies', requestOptions)
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
    static deleteMovie= async (id) =>{
        console.log("MovieService.deleteMovie(id):");
        console.log("id: " + id);
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movie)
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
    static getSessions= async (id) =>{
        console.log("MovieService.getSessions(id):");
        console.log("id: " + id);
        return fetch(BaseService._baseUrl+'/movies/' + id + '/sessions')
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
}
export default MovieService;