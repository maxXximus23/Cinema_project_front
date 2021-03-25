import AccountService from "./AccountService";
import BaseService from "./BaseService"

class HallService{
    static async getAll() {
        return fetch('http://localhost:8081/halls',
            {
                headers: {
                    Authorization: AccountService.getToken()
                }
            })
            .then(BaseService.handleError);
    }

    static getById= async (id) =>{
        console.log("HallService.getById(id):");
        console.log("id: " + id);
        return fetch(BaseService._baseUrl+'/halls/'+id)
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
    static addHall= async (hall) =>{
        console.log("HallService.addHall(hall):");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(hall)
        };
        return fetch(BaseService._baseUrl+'/halls', requestOptions)
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
    static deleteHall= async (id) =>{
        console.log("HallService.deleteHall(id):");
        console.log("id: " + id);
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        return fetch(BaseService._baseUrl+'/halls/' + id, requestOptions)
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
    static updateHall= async (id, hall) =>{
        console.log("HallService.updateHall(id, hall):");
        console.log("id: " + id);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(hall)
        };
        return fetch(BaseService._baseUrl+'/halls/' + id, requestOptions)
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
export default HallService;