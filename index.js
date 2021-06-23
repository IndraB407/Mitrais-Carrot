const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/ItemCarrot", {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err);
})

db.once('open', (err) => {
    console.log('DB Estabilished');
})

dotenv.config()
const {
    APP_PORT
} = process.env
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use('/api', require('./src/routes/auth'))

app.get('/', (req, res) => {
    return res.json({
        success: true,
        message: 'Backend is running well'
    })
})

app.listen(APP_PORT, () => {
    console.log(`App is running on port ${APP_PORT}`)
})