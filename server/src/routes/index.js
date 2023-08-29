const { Router } = require('express');
const countriesRouter = require('./countriesRoutes');
const activitiesRouter = require('./activitiesRoutes');

const router = Router();

router.use('/countries', countriesRouter);
router.use('/activities', activitiesRouter);

module.exports = router;
