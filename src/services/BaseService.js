class BaseService{
    static _baseUrl = "http://localhost:8081";
    static handleResponseError(response) {
        console.log("HTTP error, status = " + response.status);
    };
    static handleError(error) {
        console.log(error.message);
        //TODO: Redirect to error component with error body
    };
}
export default BaseService;