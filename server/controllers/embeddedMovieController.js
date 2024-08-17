const EmbeddedMovie = require('../models/EmbeddedMovie');

// get single embedded movie
exports.getSingleEmbeddedMovie = async (req, res) => {
    const id = req.params.id;
    try {
        const embeddedMovie = await EmbeddedMovie.findById(id);
        res.status(200).json({
            success: true,
            message: 'Embedded Movie found!',
            data: embeddedMovie,
        });
    } catch (error) {

        res.status(404).json({
            success: false,
            message: 'Embedded Movie not found!'
        });
    }
}

// get all embedded movies
exports.getAllEmbeddedMovies = async (req, res) => {
    try {
        const embeddedMovies = await EmbeddedMovie.find({}).limit(5);
        res.status(200).json({
            success: true,
            how_many_huh: embeddedMovies.length,
            message: 'All embedded movies are here!',
            data: embeddedMovies,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Could not find any embedded movie!'
        });
    }
}