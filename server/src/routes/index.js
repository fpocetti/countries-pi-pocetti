const { Router } = require('express');
const countriesRouter = require('./countriesRoutes');
const activitiesRouter = require('./activitiesRoutes');

const router = Router();

//middles between Front requests and the correct external API or Database's model. Converts data for it to be available for the Client.

router.use('/countries', countriesRouter);
router.use('/activities', activitiesRouter);

module.exports = router;
