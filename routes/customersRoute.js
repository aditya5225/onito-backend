const router = require('express').Router();
const customersController = require('../controllers/customersController');

router.get('/fetch_customers', customersController.fetchCustomers);
router.post('/add_customers', customersController.addCustomers);

module.exports = router;