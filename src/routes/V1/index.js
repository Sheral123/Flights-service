const express = require('express');

const {InfoController} = require('../../controllers');

const airplaneRoutes = require('./airplane-routes');
const citiesRoutes = require('./city-route');


const router = express.Router(); 

router.use('/airplanes', airplaneRoutes);

router.use('/cities', citiesRoutes);


router.get('/info', InfoController.info);

module.exports = router;
