const mongoose = require('mongoose')

const theaterSchema = new mongoose.Schema({
    theaterId:{
        type: Number,
        required: true,
    },
    location:{
        address:{
            street1:{
                type: String,
                required: true,
            },
            city:{
                type: String,
                required: true,
            },
            state:{
                type: String,
                required: true,
            },
            zipcode:{
                type: String,
                required: true,
            },
        },
        geo:{
            type:{
                type: String,
                required: true,
            },
            coordinates:{
                type: [Number],
                required: true,
            },
        },
    },
})

module.exports = mongoose.model('Theater', theaterSchema)