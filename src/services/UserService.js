import BaseService from "./BaseService"

class UserService{
    static showAccount= async (id) =>{
        console.log("UserService.showAccount(id):");
        console.log("id: " + id);
        return fetch(BaseService._baseUrl+'/users/'+id)
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
    static passwordChange= async (id, newPassword) =>{
        console.log("UserService.passwordChange(id, newPassword):");
        console.log("id: " + id);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPassword)
        };
        return fetch(BaseService._baseUrl+'/users/' + id+'/changePassword', requestOptions)
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
export default UserService;