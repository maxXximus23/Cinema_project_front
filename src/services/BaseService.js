class BaseService{
    static _baseUrl = "http://localhost:8081";
    static handleResponseError(response) {
        console.log("HTTP error, status = " + response.status);
    };
    static async handleError(response) { 
        if (!response.ok){
            await response.json()
                    .then(res => {
                        throw res
                    })
        }
        console.log(response)
        if (response.status != 204)
            return response.json();
    };
}
export default BaseService;