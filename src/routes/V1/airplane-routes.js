const express = require('express');

const {AirplaneController} = require('../../controllers')

const router = express.Router();

const {AirplaneMiddlewares} = require('../../middlewares');

// /api/V1/airplanes POST
router.post('/',
                AirplaneMiddlewares.validateCreateRequest,
                AirplaneController.CreateAirplane);


// /api/V1/airplanes GET                
router.get('/', AirplaneController.GetAllAirplane);


// /api/V1/airplanes/:id GET
router.get('/:id', AirplaneController.GetAirplane);

                
module.exports = router;
