const { StatusCodes } = require('http-status-codes');
const{FlightRepo } = require('../repositories');
const AppError = require('../utills/errors/app-error');
const{ datetimeHelpers } = require('../utills/helpers/datetime-helper')

const flightRepo = new FlightRepo();

async function createFlight(data){
    try {
        if(!datetimeHelpers.compareTime(data.arrivalTime,data.departureTime)){
            throw new AppError('Arrival time must be greater than departure time', StatusCodes.BAD_REQUEST);
        }
        else if(data.arrivalTime == data.departureTime){
            throw new AppError('Arrival time and departure time cannot be same', StatusCodes.BAD_REQUEST);  
        };
        const flight = await flightRepo.create(data);
        return flight;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getFlights(){
    try {
        const flight = await flightRepo.getAll();
        return flight;
    } catch (error) {
        throw new AppError('Unable to fetch data from mysql database', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try {
        const flight = await flightRepo.get(id);
        return flight;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The flight data you requested is not present', error.statusCode);
        }
        throw new AppError('Unable to fetch data from mysql database', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyFlight(id){
    try {
        const response = await flightRepo.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The flight data you requested to delete is not present', error.statusCode);
        }

        throw new AppError('Unable to delete data from mysql database', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createFlight,
    getFlight,
    getFlights,
    destroyFlight
}                                         