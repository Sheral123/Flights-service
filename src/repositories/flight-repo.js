const {Sequelize, Op} = require('sequelize')
const CrudRepo = require('./crud-repo');

const { Flight, Airplane,City, Airport } = require('../models')

const db = require('../models');
class FlightRepo extends CrudRepo{
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter,sort){
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include:[
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetail' 
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                    },
                    include:{
                        model: City,
                        required: true
                    }
                    
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on: {
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    },
                    include:{
                        model: City,
                        required: true
                    }                    
                    
                },                
                      
            ]        
        });
        return response;
    }

    async updateRemainingSeats(flightId, seats, dec= true){
        //const flight= await Flight.findByPk(flightId);
        const transaction = await db.sequelize.transaction();
        await db.sequelize.query(`Select * from Flights WHERE Flights.id = ${flightId} FOR UPDATE `);
        if(+(dec)){
            await Flight.decrement('totalSeats', {by: seats, where:{id: flightId}}, {transaction: transaction});
        }
        else{
            await Flight.increment('totalSeats', {by: seats, where:{id: flightId}}, {transaction: transaction});
        }
        const flight= await Flight.findByPk(flightId);
        return flight;
    }
    
}



 

module.exports = FlightRepo; 