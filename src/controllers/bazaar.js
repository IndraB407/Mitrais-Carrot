const response = require('../helpers/response')
const Bazaar = require('../models/bazaar')

const getAllBazaar = (req, res) => {
    let {
        role
    } = req.userData
    if (role === 2) {
        Bazaar.find({}).then((data) => {
            return response(res, 200, true, 'list all bazaar', data)
        })
    } else {
        return response(res, 400, false, 'sorry you dont have authorization to access this file')
    }
}

const addBazaar = (req, res) => {
    const {
        period,
        duration,
        id_item,
        stock,
        price,
        image
    } = req.body
    const {
        role
    } = req.userData
    if (role === 2) {
        let bazaar = new Bazaar({
            period,
            duration,
            id_item,
            stock,
            price,
            image
        })
        bazaar.save()
            .then(bazaar => {
                return response(res, 200, true, 'Bazaar added successfully')
            })
            .catch(err => {
                return response(res, 400, false, err)
            })
    } else {
        return response(res, 400, false, 'sorry you dont have authorization to do this process')
    }
}

const deleteBazaar = (req, res) => {
    const {
        _id
    } = req.params.id
    const {
        role
    } = req.userData
    if (role === 2) {
        Bazaar.findByIdAndDelete({
            _id
        }, () => {
            return response(res, 200, true, 'Bazaar deleted successfully')
        });
    } else {
        return response(res, 400, false, 'sorry you dont have authorization to do this process')
    }
}

module.exports = {
    addBazaar,
    deleteBazaar,
    getAllBazaar
}