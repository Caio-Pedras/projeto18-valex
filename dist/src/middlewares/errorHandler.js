var ERRORS = {
    unauthorized: 401,
    NotFound: 404,
    BadRequest: 400
};
export default function errorHandler(err, req, res, next) {
    console.log(err);
    var type = err.type;
    var statusCode = ERRORS[type];
    if (!statusCode) {
        statusCode = 500;
    }
    return res.status(statusCode).send(err.message);
}
