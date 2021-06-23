const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    role_id: {
        type: Number
    }
}, {timestamps: true})

const User = mongoose.model("users", userSchema)
module.exports = User