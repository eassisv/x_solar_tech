const { Router } = require('express');
const customersRouter = require('./customers');

const router = Router();

router.use('/customers', customersRouter);

module.exports = router;
