const express = require('express');

const {AirplaneController} = require('../../controllers')

const router = express.Router();

const {AirplaneMiddlewares} = require('../../middlewares');

router.post('/',
                AirplaneMiddlewares.validateCreateRequest,
                AirplaneController.CreateAirplane);

module.exports = router;
