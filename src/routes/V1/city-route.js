const express = require('express');

const {CityController} = require('../../controllers')

const router = express.Router();

//const {AirplaneMiddlewares} = require('../../middlewares');

// /api/V1/airplanes POST
router.post('/',
                CityController.createCity);


                

module.exports = router;
