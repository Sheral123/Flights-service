const { StatusCodes } = require('http-status-codes');
const{FlightRepo } = require('../repositories');
const AppError = require('../utills/errors/app-error');
const datetimeHelpers  = require('../utills/helpers/datetime-helper');
const{Op} = require('sequelize');

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
        console.log(error);
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


async function getAllFlights(query){
    let customFilter = {};
    let sortFilter = [];
    const endingTime = "23:59:00";
    //trips=MUM-DEL
    if(query.trips){
        [departureairportId, arrivalairportId] = query.trips.split('-');
        customFilter.departureairportId=departureairportId;
        customFilter.arrivalairportId=arrivalairportId;
    }

    if(query.price){
        [minPrice, maxPrice] = query.price.split('-');
        customFilter.price = {
            [Op.between]: [minPrice,(maxPrice == undefined) ? 20000 : maxPrice]
        }
    }

    if(query.travellers){
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }

    if(query.tripDate){
        customFilter.departureTime = {
            
            [Op.between]: [query.tripDate + "00:00:00",query.tripDate + endingTime ]
        }
    }

    if(query.sort){
        const params = query.sort.split(',');
        const sortFilters= params.map((p) => p.split('_'));
        sortFilter = sortFilters
    }

    try {
        const flights = await flightRepo.getAllFlights(customFilter,sortFilter);
        return flights;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function getFlight(id){
    try {
        const flight = await flightRepo.get(id);
        console.log('service',flight);
        return flight;
    } catch (error) {
        console.log('service',error);
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The flight data you requested is not present', error.statusCode);
        }
        throw new AppError('Unable to fetch data from mysql database', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}



module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}                                         