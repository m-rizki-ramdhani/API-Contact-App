const {constants} = require('../constants');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    const errorResponse = {
        title: '',
        message: err.message,
        stackTrace: err.stack,
    };

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            errorResponse.title = 'Bad request'
            break;
        case constants.UNAUTHORIZED:
            errorResponse.title = 'Unauthorized';
        case constants.FORBIDDEN:
            errorResponse.title = 'Forbidden';
            break;
        case constants.NOT_FOUND:
            errorResponse.title = 'Not found';
            break;
        case constants.SERVER_ERROR:
            errorResponse.title = 'Server error';
            break;
        default:
            console.log('No error message, all good!')
            break;
    };
    
    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;