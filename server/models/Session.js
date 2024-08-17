const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    user_id:{
        type: String,
        required: true,
    },
    jwt:{
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Session', sessionSchema)