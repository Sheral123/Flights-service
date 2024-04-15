const {AirplaneService }  = require('../services');

//const AppError = require('../utills/errors/app-error');
const{ErrorResponse, SuccessResponse} = require('../utills/common') 
const {StatusCodes } = require('http-status-codes');

//POST : /airplanes
// req-body {modelnumber: 'airbus320' , capacity: 200}

async function CreateAirplane(req, res){
   // console.log('Sheral', req.body);
   // console.log('Sheral', res);
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = airplane;
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

module.exports = {
    CreateAirplane
}