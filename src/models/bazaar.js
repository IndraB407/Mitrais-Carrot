const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bazaarSchema = new Schema({
    period: {
        type: String
    },
    duration: {
        type: Number
    },
    id_item: {
        type: Number
    },
    stock: {
        type: Number
    },
    price: {
        type: Number
    },
    image: {
        type: String
    },
}, {
    timestamps: true
})

const Bazaar = mongoose.model("bazaars", bazaarSchema)
module.exports = Bazaar