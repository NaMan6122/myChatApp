class ApiResponse{
    constructor(
        statusCode,
        data,
        message = "ApiRESPONSE",
    ){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}

export {ApiResponse};