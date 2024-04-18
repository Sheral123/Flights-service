const { StatusCodes } = require('http-status-codes');
const{ CityRepo} = require('../repositories');
const AppError = require('../utills/errors/app-error');

const cityRepo = new CityRepo();

async function createCity(data){

    try {
        const city = await cityRepo.create(data);
        return city;
    } catch (error) {
        console.log(error);
        if(error.name == 'SequelizeValidationError' || 'SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}




module.exports = {
    createCity
}