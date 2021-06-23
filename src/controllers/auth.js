const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const response = require('../helpers/response')
const User = require('../models/user')

const register = (req, res) => {

    bcrypt.hash(req.body.password, 10, function (err, encryptedPassword) {
        if (err) {
            return response(res, 400, false, `${err}`)
        }
        let user = new User({
            username: req.body.username,
            password: encryptedPassword,
            email: req.body.email,
            name: req.body.name,
            role_id: req.body.role_id
        })
        console.log(user);
        user.save()
            .then(user => {
                console.log('ngga gagal om');
                return response(res, 200, true, 'User added successfully')
            })
            .catch(err => {
                console.log('eh yang ini om');
                return response(res, 400, false, err)
            })
    })
}

const login = (req, res) => {
    const {username, password} = req.body
    User.findOne({
            $or: [{
                username: username
            }]
        })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    console.log(result);
                    if (err) {
                        return response(res, 400, false, `${err}`)
                    }
                    if (result) {
                        let token = jwt.sign({name: user.name}, 'verySecretValue', {expiresIn: '10m'})
                        return response(res, 200, true, 'login success', token)

                    } else {
                        return response(res, 400, false, 'wrong password')
                    }
                })
            } else {
                return response(res, 400, false, 'no user found')
            }
        })
}

module.exports = {
    register,
    login
}