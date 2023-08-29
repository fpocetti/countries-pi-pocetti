const { Router } = require('express');
const activitiesRouter = Router();

//modularización de los requests que se hagan a la tabla activity

//! me traigo todos los controllers
//const getUsers = require('../controllers/getUsers');

activitiesRouter.post('/', (req, res) => {
	res.send(
		'This is route POST /activities. In its body, this will include all data to create a touristic activity in the data base, and relate it to at least one country'
	);
});

activitiesRouter.get('/', (req, res) => {
	res.send(
		'This is route GET /activities. This will return an array of objects. Each object is an activity.'
	);
});

module.exports = activitiesRouter;
