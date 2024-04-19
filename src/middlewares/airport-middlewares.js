const {StatusCodes} = require('http-status-codes');

const {ErrorResponse} = require('../utills/common');
const AppError = require('../utills/errors/app-error');

function validateCreateRequest(req,res,next) {
    if(!req.body.name){
        ErrorResponse.message = 'Something went wrong creating airport';
        ErrorResponse.error = new AppError(['name not found in incoming request in correct form '],StatusCodes.BAD_REQUEST )
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.code){
        ErrorResponse.message = 'Something went wrong creating airport';
        ErrorResponse.error = new AppError(['Airport code not found in incoming request in correct form '],StatusCodes.BAD_REQUEST )
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    if(!req.body.cityId){
        ErrorResponse.message = 'Something went wrong creating airport';
        ErrorResponse.error = new AppError(['Airport code not found in incoming request in correct form '],StatusCodes.BAD_REQUEST )
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }

    next();
}

module.exports = {
    validateCreateRequest
}