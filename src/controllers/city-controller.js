const {CityService }  = require('../services');

//const AppError = require('../utills/errors/app-error');
const{ErrorResponse, SuccessResponse} = require('../utills/common') 
const {StatusCodes } = require('http-status-codes');

//POST : /cities
// req-body {name: 'London'}

async function createCity(req, res){
   // console.log('Sheral', req.body);
   // console.log('Sheral', res);
    try {
        const city = await CityService.createCity({
            name : req.body.name,
        });
        SuccessResponse.data = city;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        //console.log('Sheral', error);
        ErrorResponse.error = error;
        return res  
                .status(error.statusCode)
                .json(ErrorResponse)
        
    }
}

module.exports= {
    createCity
}