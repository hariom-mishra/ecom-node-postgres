class AppResponse {
    constructor({ data = null, message = 'Success', statusCode = 200 }) {
        this.message = message;
        this.statusCode = statusCode;
        this.status = 'success';
        this.data = data;
    }
}

export default AppResponse;