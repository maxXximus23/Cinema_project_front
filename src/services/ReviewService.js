import BaseService from "./BaseService"

class ReviewService{
    static getById= async (id) =>{
        console.log("ReviewService.getById(id):");
        console.log("id: " + id);
        return fetch(BaseService._baseUrl+'/reviews/'+id)
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
    static addReview= async (review) =>{
        console.log("ReviewService.addReview(review):");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        };
        return fetch(BaseService._baseUrl+'/reviews', requestOptions)
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
    static deleteComment= async (id) =>{
        console.log("ReviewService.deleteComment(id):");
        console.log("id: " + id);
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        return fetch(BaseService._baseUrl+'/reviews/' + id, requestOptions)
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
    static async getListOfMovieReviews(id) {
        return fetch(BaseService._baseUrl + '/reviews/movie/' + id,
            {
                headers: {
                    "Authorization": "Bearer_" + JSON.parse(localStorage.getItem("userCredentials")).token
                }
            })
            .then(BaseService.handleError);
    }
}
export default ReviewService;