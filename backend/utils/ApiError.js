class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something Went Wrong!!",
        errors = [],
        stack = "",
    ){
        super(message),
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = success;
        this.data = null;
        // If a stack is provided, use it; otherwise, use the stack from Error
        // if (stack) {
        //     this.stack = stack;
        // } else {
        //     Error.captureStackTrace(this, this.constructor);
        // }
    }
}

export {ApiError};