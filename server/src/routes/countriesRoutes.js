const { Router } = require('express');
const countriesRouter = Router();

const getCountryById = require('../controllers/getCountryById');
const getCountries = require('../controllers/getCountries');

//modularization of requests done to Country model

countriesRouter.get('/', getCountries);

countriesRouter.get('/:id', getCountryById);

module.exports = countriesRouter;
