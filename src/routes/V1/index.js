const express = require('express');

const {InfoController} = require('../../controllers');

const airplaneRoutes = require('./airplane-routes');
const citiesRoutes = require('./city-route');

const airportRoutes = require('./airport-routes');

const router = express.Router(); 

router.use('/airplanes', airplaneRoutes);

router.use('/cities', citiesRoutes);

router.use('/airports', airportRoutes);


router.get('/info', InfoController.info);

module.exports = router;
