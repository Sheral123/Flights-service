const express = require('express');

const {FlightController} = require('../../controllers')

const router = express.Router();

const {FlightMiddlewares} = require('../../middlewares');

// /api/V1/flights POST
router.post('/',
                FlightMiddlewares.validateCreateRequest,
                FlightController.CreateFlight);

                

module.exports = router;
