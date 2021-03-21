import BaseService from "./BaseService"

class AccountService {
    static login= async (user) =>{
        console.log("UserService.login(user):");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        return fetch(BaseService._baseUrl+'/users/login', requestOptions)
            .then(response => {
                if (!response.ok) {
                    BaseService.handleResponseError(response);
                    return response.json();
                }
                return response;
            })
            .catch(error => {
                BaseService.handleError(error);
            });
    };
    static register = async (user) => {
        console.log("UserService.register(user):");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        return fetch(BaseService._baseUrl+'/users/register', requestOptions)
            .then(response => {
                if (!response.ok) {
                    BaseService.handleResponseError(response);
                    return response.json();
                }
                return response;
            })
            .catch(error => {
                BaseService.handleError(error);
            });
    };
    static isEmailFree= async(email)=> {
        console.log("UserService.isEmailFree(email):");
        console.log("email: " + email);
        return fetch(BaseService._baseUrl+'/users/check-'+email)
            .then(response => {
                if (!response.ok) {
                    BaseService.handleResponseError(response);
                    return response.json();
                }
                console.log(response)
                return response;
            })
            .catch(error => {
                BaseService.handleError(error);
            });
    }
}
export default AccountService;