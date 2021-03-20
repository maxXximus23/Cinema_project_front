import BaseService from "./BaseService"

class TicketService extends BaseService{
    static getByUser= async (id) =>{
        console.log("TicketService.getByUser(id):");
        console.log("id: " + id);
        return fetch(BaseService._baseUrl+'/tickets/user/'+id)
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
    static purchaseTickets= async (ticketsData) =>{
        console.log("TicketService.purchaseTickets(hall):");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ticketsData)
        };
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
    };
}
export default TicketService;