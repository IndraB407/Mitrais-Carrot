const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const response = require('../helpers/response')
const User = require('../models/user')
const {
    APP_KEY
} = process.env

const register = (req, res) => {
    const {username, password, email, name, role_id} = req.body
    bcrypt.hash(password, 10, function (err, encryptedPassword) {
        if (err) {
            return response(res, 400, false, `${err}`)
        }
        let user = new User({
            username: username,
            password: encryptedPassword,
            email: email,
            name: name,
            role_id: role_id
        })
        user.save()
            .then(user => {
                return response(res, 200, true, 'User added successfully')
            })
            .catch(err => {
                return response(res, 400, false, err)
            })
    })
}

const login = (req, res) => {
    const {
        username,
        password
    } = req.body
    User.findOne({
            $or: [{
                username: username
            }]
        })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        return response(res, 400, false, `${err}`)
                    }
                    if (result) {
                        let token = jwt.sign({
                            name: user.name,
                            role: user.role_id
                        }, APP_KEY, {
                            expiresIn: '10m'
                        })
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

const getAllUser = (req, res) => {
    let {
        role
    } = req.userData
    if (role === 2) {
        User.find({}).then((data) => {
            return response(res, 200, true, 'list all user', data)
        })
    } else {
        return response(res, 400, false, 'sorry you dont have authorization to access this file')
    }
}

module.exports = {
    register,
    login,
    getAllUser
}