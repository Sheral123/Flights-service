const express = require('express');

const {CityController} = require('../../controllers')
const {CityMiddlewares} = require('../../middlewares')


const router = express.Router();

//const {AirplaneMiddlewares} = require('../../middlewares');

// /api/V1/airplanes POST
router.post('/',CityMiddlewares.validateCreateRequest,
                CityController.createCity);


                

module.exports = router;
