const express = require('express');

const {FlightController} = require('../../controllers')

const router = express.Router();

const {FlightMiddlewares} = require('../../middlewares');

// /api/V1/flights POST
router.post('/',
                FlightMiddlewares.validateCreateRequest,
                FlightController.CreateFlight);

// /api/V1/flights?MUM-DEL GET
router.get('/',FlightController.getAllFlights);

                

module.exports = router;
