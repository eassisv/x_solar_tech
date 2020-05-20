const { Router } = require('express');
const { Customer } = require('../models');
const customerController = require('../controllers/customers');
const validator = require('../middlewares/validator');
const loadInstance = require('../middlewares/loadInstance');
const customerSchema = require('../schemas/customer');

const router = Router();

router.get('/', customerController.list);
router.post('/', validator(customerSchema), customerController.store);
router.delete(
  '/:customerId/',
  loadInstance(Customer),
  customerController.delete,
);

module.exports = router;