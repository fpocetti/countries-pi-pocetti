const { Router } = require('express');
const activitiesRouter = Router();
const getActivities = require('../controllers/getActivities');
const postActivity = require('../controllers/postActivity');

//modularization of requests done to Activity model

activitiesRouter.post('/', postActivity);
activitiesRouter.get('/', getActivities);

module.exports = activitiesRouter;
