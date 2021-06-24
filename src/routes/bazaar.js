const express = require('express')
const router = express.Router();
const bazaarControllers = require('../controllers/bazaar')
const userValidator = require('../middlewares/auth')

router.get('/bazaar', userValidator.authCheck, bazaarControllers.getAllBazaar)
router.post('/bazaar', userValidator.authCheck, bazaarControllers.addBazaar)
router.delete('/bazaar/:id', userValidator.authCheck, bazaarControllers.deleteBazaar)

module.exports = router;