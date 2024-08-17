const Movie = require('../models/Movie');

// add new movie(s)
exports.addNewMovie = async (req, res) => {
    // const newMovie = new Movie(req.body);
    const newMovies = Array.isArray(req.body) ? req.body : [req.body]

    try {
        // const savedMovie = await newMovies.save();
        const savedMovies = await Movie.insertMany(newMovies);

        res.status(200).json({
            success: true,
            message: 'New Movie Added Successfully!',
            data: savedMovies,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Cannot Add A Movie. Error: ' + error.message
        });
    }
}

// update movie(s)
exports.updateMovies = async (req, res) => {
    // const id = req.params.id
    const { ids, updateFields } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No movie IDs provided or invalid format!'
        });
    }

    try {
        // const updatedMovie = await Movie.findByIdAndUpdate(
        const result = await Movie.updateMany(
            // id
            {_id:{$in:ids}}, 
            // {$set:req.body},
            {$set:updateFields},
            {new: true}
        )
        /**
         * result:
         * "data": {
            "acknowledged": true,
            "modifiedCount": 1,
            "upsertedId": null,
            "upsertedCount": 0,
            "matchedCount": 1
        }
         */
        res.status(200).json({
            success: true,
            message: 'Movies Updated Successfully!',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update!'
        });
    }
}

// delete single movie
exports.deleteSingleMovie = async (req, res) => {
    const id = req.params.id

    try {
        await Movie.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: 'A Movie Is Deleted Successfully!',
        });

        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete this movie!'
        });
    }
}

// delete movies
exports.deleteMovies = async (req, res) => {
    // const id = req.params.id
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'No movie IDs provided or invalid format!'
        });
    }

    try {
        // await Movie.findByIdAndDelete(id);
        await Movie.deleteMany({ _id: { $in: ids } });
        res.status(200).json({
            success: true,
            message: 'Movies Deleted Successfully!',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete! Error: '+ error.message,
        });
    }
}

// get single movie
exports.getSingleMovie = async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await Movie.findById(id);
        res.status(200).json({
            success: true,
            message: 'Movie found!',
            data: movie,
        });
    } catch (error) {

        res.status(404).json({
            success: false,
            message: 'Movie not found!'
        });
    }
}

// get all movies
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find({}).limit(5);
        res.status(200).json({
            success: true,
            how_many_huh: movies.length,
            message: 'All movies are here!',
            data: movies,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Could not find any movie!'
        });
    }
}

// search movies by filters
exports.getMoviesByFilters = async(req, res) => {
    // variable 'i' <=> case sensitive
    const genres = new RegExp(req.query.genres, 'i')
    const languages = new RegExp(req.query.genres, 'i')
    const year = parseInt(req.query.year)
    const runtime = parseInt(req.query.runtime)

    try {
        const results = await Movie.find({
            languages,
            year:{$gte:year},
        })
        // .select({
        //     genres:1,
        //     title:1,
        //     year:1
        // })
        .limit(5)
        res.status(200).json({
            success: true,
            message: 'Results found!',
            data: results,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Could not find any result!'
        });
    }
}