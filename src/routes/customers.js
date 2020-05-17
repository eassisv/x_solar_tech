const { Router } = require('express');
const customerController = require('../controllers/customers');

const router = Router();

router.get('/', customerController.list);

module.exports = router;
