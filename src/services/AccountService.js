import BaseService from "./BaseService"

class AccountService {
    static login= async (user) =>{
        console.log("UserService.login(user):");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        return fetch(BaseService._baseUrl+'/auth/login', requestOptions)
            .then(response => {
                if (!response.ok) {
                    BaseService.handleResponseError(response);
                    throw response;
                }
                return response.json();
            })
            .then(res => {
                localStorage.setItem("userCredentials", JSON.stringify(res))
                return res
            })
            .catch(error => {
                BaseService.handleError(error);
            });
    }

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
    static logout(){
        console.log("logout")
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: AccountService.getToken()
            },
            body: JSON.stringify({
                id: AccountService.getId(),
                token: AccountService.getToken()
            })
        };
        fetch(BaseService._baseUrl + '/auth/logout', requestOptions)
            .then(BaseService.handleError)
            .then(() => {
                localStorage.removeItem('userCredentials')
                window.location.replace("/")
            })
            .catch(error => {
                console.log(error)
            });
    }

    static isLogged() {
        return !(localStorage.getItem("userCredentials") == null)
    } 

    static getUser(){
        return fetch('http://localhost:8081/users/' + AccountService.getId(),
            {
                headers: {
                    Authorization: AccountService.getToken()
                }
            })
            .then(BaseService.handleError);
    }

    static getToken(){
        if (AccountService.isLogged())
            return "Bearer_" + JSON.parse(localStorage.getItem("userCredentials"))?.token
        else
            return "none"
    }

    static getId(){
        if (AccountService.isLogged())
            return JSON.parse(localStorage.userCredentials)?.id
        else
            return -1
    }
}
export default AccountService;