const {StatusCodes} = require('http-status-codes');

const {ErrorResponse} = require('../utills/common');
const AppError = require('../utills/errors/app-error');

function validateCreateRequest(req,res,next) {
    if(!req.body.modelNumber){
        ErrorResponse.message = 'Something went wrong creating airplane';
        ErrorResponse.error = new AppError(['model number not found in incoming request in correct form '],StatusCodes.BAD_REQUEST )
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}