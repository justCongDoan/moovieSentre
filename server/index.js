const express = require('express');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movie')
const theaterRoutes = require('./routes/theater')
const commentRoutes = require('./routes/comment')
const userRoutes = require('./routes/user')
const embeddedMovieRoutes = require('./routes/embeddedMovie')
const sessionRoutes = require('./routes/session')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();
const port = 4000;

const corsOptions = {
    origin: true,
    credentials: true
};

// database connection
mongoose.set("strictQuery", false);
const connect = async() => {
    try {
        await mongoose.connect('mongodb+srv://justDoan:mAfjriZqvXZDWkkH@cluster0.a38frs5.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0')
        console.log("Mongo database is connected")
    } catch (error) {
        console.log("Mongo database is failed to connect")
    }
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/movies', movieRoutes);
app.use('/theaters', theaterRoutes);
app.use('/comments', commentRoutes);
app.use('/users', userRoutes);
app.use('/embedded_movies', embeddedMovieRoutes);
app.use('/sessions', sessionRoutes);

app.listen(port, () => {
    connect();
    console.log(`Server is running on port ${port}`);
});