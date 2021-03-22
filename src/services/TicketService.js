import AccountService from "./AccountService";
import BaseService from "./BaseService"

class TicketService extends BaseService{
    static async getBySession(id) {
        return fetch(BaseService._baseUrl + '/sessions/' + id + '/tickets',
        {
            headers: {
                Authorization: AccountService.getToken()
            }
        })
            .then(BaseService.handleError)
    }

    static async getByUser(id) {
        return fetch(BaseService._baseUrl + '/tickets/user/' + id,
        {
            headers: {
                Authorization: AccountService.getToken()
            }
        })
            .then(BaseService.handleError)
    }

    static async purchaseTickets(id, ticketsData) {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: AccountService.getToken()
            },
            body: JSON.stringify({
                sessionId: id,
                userId: AccountService.getId(),
                places: ticketsData
            })
        };
        console.log(requestOptions)
        return fetch(BaseService._baseUrl+'/tickets/purchaselist', requestOptions)
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

    static purchaseTicket= async (purchaseTicket) =>{
        console.log("TicketService.purchaseTicket(purchase):");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(purchaseTicket)
        };
        return fetch(BaseService._baseUrl+'/tickets/purchase', requestOptions)
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
    static cancelBooking= async (id) =>{
        console.log("TicketService.cancelBooking(id):");
        console.log("id: " + id);
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        };
        return fetch(BaseService._baseUrl+'/tickets/' + id, requestOptions)
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
export default TicketService;