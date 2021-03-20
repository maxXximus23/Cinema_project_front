import BaseService from "./BaseService"

class SessionService{
    static getSession= async (id) =>{
        console.log("SessionService.getSession(id):");
        console.log("id: " + id);
        return fetch(BaseService._baseUrl+'/sessions/'+id)
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
    static addSession= async (session) =>{
        console.log("SessionService.addSession(session):");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(session)
        };
        return fetch(BaseService._baseUrl+'/sessions', requestOptions)
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
    static deleteSession= async (id) =>{
        console.log("SessionService.deleteSession(id):");
        console.log("id: " + id);
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        return fetch(BaseService._baseUrl+'/sessions/' + id, requestOptions)
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
    static updateSession= async (id, session) =>{
        console.log("SessionService.updateSession(id, session):");
        console.log("id: " + id);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(session)
        };
        return fetch(BaseService._baseUrl+'/sessions/' + id, requestOptions)
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
    static getActual= async () =>{
        console.log("SessionService.getActual():");
        return fetch(BaseService._baseUrl+'/sessions/actual')
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
    static getTicketsList= async (id) =>{
        console.log("SessionService.getTicketsList(id):");
        console.log("id: " + id);
        return fetch(BaseService._baseUrl+'/sessions/'+id+'/tickets')
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
export default SessionService;