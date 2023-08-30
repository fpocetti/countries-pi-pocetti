const { Router } = require('express');
const activitiesRouter = Router();
const getActivities = require('../controllers/getActivities');
const postActivity = require('../controllers/postActivity');

//modularization of requests done to Activity model
//this handler calls each controller, depending on the endpoint

activitiesRouter.post('/', postActivity);
activitiesRouter.get('/', getActivities);

module.exports = activitiesRouter;
