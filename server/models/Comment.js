const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    movie_id:{
        type: mongoose.Types.ObjectId,
        ref: "Movie",
    },
    text:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('Comment', commentSchema)