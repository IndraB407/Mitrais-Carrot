const express = require('express')
const userModels = require('../models/user')
const authControllers = require('../controllers/auth')
const router = express.Router();

router.get('/users', (req, res) => {
    userModels.find({}).then((data) => {
        res.status(200).json({
            success : 'true',
            message : 'list all user',
            status  : '200',
            results : data
        })
    })
})

router.post('/register', authControllers.register)
router.post('/login', authControllers.login)

module.exports = router;