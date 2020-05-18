const { Router } = require('express');
const customerController = require('../controllers/customers');
const validator = require('../middlewares/validator');
const customerSchema = require('../schemas/customer');

const router = Router();

router.get('/', customerController.list);
router.post('/', validator(customerSchema), customerController.store);

module.exports = router;
