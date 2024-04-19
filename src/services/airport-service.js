const { StatusCodes } = require('http-status-codes');
const{ AirportRepo } = require('../repositories');
const AppError = require('../utills/errors/app-error');

const airportRepo = new AirportRepo();

async function createAirport(data){
    try {
        const airport = await airportRepo.create(data);
        return airport;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports(){
    try {
        const airports = await airportRepo.getAll();
        return airports;
    } catch (error) {
        throw new AppError('Unable to fetch data from mysql database', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
    try {
        const airport = await airportRepo.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airport data you requested is not present', error.statusCode);
        }
        throw new AppError('Unable to fetch data from mysql database', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id){
    try {
        const response = await airportRepo.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airport data you requested to delete is not present', error.statusCode);
        }

        throw new AppError('Unable to delete data from mysql database', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createAirport,
    getAirport,
    getAirports,
    destroyAirport
}                                         