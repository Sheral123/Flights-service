const { StatusCodes } = require('http-status-codes');
const{ AirplaneRepo } = require('../repositories');
const AppError = require('../utills/errors/app-error');

const airplaneRepo = new AirplaneRepo();

async function createAirplane(data){
    try {
        const airplane = await airplaneRepo.create(data);
        return airplane;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes(){
    try {
        const airplanes = await airplaneRepo.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError('Unable to fetch data from mysql database', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id){
    try {
        const airplane = await airplaneRepo.get(id);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airplane data you requested is not present', error.statusCode);
        }
        throw new AppError('Unable to fetch data from mysql database', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id){
    try {
        const response = await airplaneRepo.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airplane data you requested to delete is not present', error.statusCode);
        }

        throw new AppError('Unable to delete data from mysql database', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane
}                                         