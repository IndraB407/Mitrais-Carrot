const express = require('express')
const authControllers = require('../controllers/auth')
const userValidator = require('../middlewares/auth')
const router = express.Router();

router.get('/users', userValidator.authCheck, authControllers.getAllUser)
router.post('/register', authControllers.register)
router.post('/login', authControllers.login)

module.exports = router;