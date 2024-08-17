const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    plot:{
        type: String,
        required: true,
    },
    genres:{
        type: [String],// Array of strings
        required: true,
    },
    runtime:{
        type: Number,
        required: true,
    },
    cast:{
        type: [String],// Array of strings
        required: true,
    },
    num_mflix_comments:{
        type: Number,
        required: true,
    },
    poster:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    fullplot:{
        type: String,
        required: true,
    },
    countries:{
        type: [String],// Array of strings
        required: true,
    },
    released:{
        type: Date,
        required: true,
    },
    directors:{
        type: [String],// Array of strings
        required: true,
    },
    writers:{
        type: [String],// Array of strings
        required: true,
    },
    awards:[{
        wins:{
            type: Number,
            required: true,
        },
        nominations:{
            type: Number,
            required: true,
        },
        text:{
            type: String,
            required: true,
        },
    }],
    lastupdated:{
        type: Date,
        required: true,
    },
    year:{
        type: Number,
        required: true,
    },
    imdb:[{
        rating:{
            type: Number,
            required: true,
        },
        votes:{
            type: Number,
            required: true,
        },
        id:{
            type: Number,
            required: true,
        },
    }],
    type:{
        type: String,
        required: true,
    },
    tomatoes:[{
        viewer:[{
            rating:{
                type: Number,
                required: true,
            },
            numReviews:{
                type: Number,
                required: true,
            },
        }],
        lastUpdated:{
            type: Date,
            required: true,
        },
    }],
})

module.exports = mongoose.model('Movie', movieSchema)