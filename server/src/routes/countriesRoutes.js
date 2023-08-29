const { Router } = require('express');
const countriesRouter = Router();

const getCountryById = require('../controllers/getCountryById');
const getCountries = require('../controllers/getCountries');

//modularización de los requests que se hagan a la tabla country

countriesRouter.get('/', getCountries);

countriesRouter.get('/:id', getCountryById);

module.exports = countriesRouter;
