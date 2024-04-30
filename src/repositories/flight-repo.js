const CrudRepo = require('./crud-repo');
const { Flight } = require('../models')
class FlightRepo extends CrudRepo{
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter,sort){
        const response = await Flight.findAll({
            where: filter,
            order: sort
        });
        return response;
    }
}




module.exports = FlightRepo; 