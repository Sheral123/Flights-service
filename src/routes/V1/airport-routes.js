const express = require('express');

const {AirportController} = require('../../controllers')

const router = express.Router();

const {AirportMiddlewares} = require('../../middlewares');

// /api/V1/airports POST
router.post('/',
                AirportMiddlewares.validateCreateRequest,
                AirportController.CreateAirport);


// /api/V1/airports GET                
router.get('/', AirportController.GetAllAirport);


// /api/V1/airports/:id GET
router.get('/:id', AirportController.GetAirport);

// /api/V1/airports/:id DELETE
router.delete('/:id', AirportController.DestroyAirport);

                

module.exports = router;
