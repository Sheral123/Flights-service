const {FlightService }  = require('../services');

//const AppError = require('../utills/errors/app-error');
const{ErrorResponse, SuccessResponse} = require('../utills/common') 
const {StatusCodes } = require('http-status-codes');

//POST : /flights
/* req-body {
 
        flightNumber: 'UK 808',
        airplaneId: 'a380',
        departureairportId: 12,
        arrivalairportId: 11,
        arrivalTime: '11:10:00',
        departureTime: '9:10:00',
        price: 2000,
        boardingGate: '12A',
        totalSeats: 120   

}
*/

async function CreateFlight(req, res){
   // console.log('Sheral', req.body);
   // console.log('Sheral', res);
    try {
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureairportId: req.body.departureairportId,
            arrivalairportId: req.body.arrivalairportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        SuccessResponse.data = flight;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        console.log('Sheral', error);
        ErrorResponse.error = error;
        return res  
                .status(error.statusCode)
                .json(ErrorResponse)
        
    }
}


//GET : /airports
// req-body {}


async function getAllFlights(req, res){
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse)
    }
}

module.exports = {
    CreateFlight,
    getAllFlights
}