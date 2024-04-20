const CrudRepo = require('./crud-repo');
const { Flight } = require('../models')
class FlightRepo extends CrudRepo{
    constructor(){
        super(Flight);
    }
}

module.exports = FlightRepo; 