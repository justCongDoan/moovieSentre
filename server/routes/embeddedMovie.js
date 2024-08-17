const express = require('express');
const router = express.Router();
const embeddedMovieController = require('../controllers/embeddedMovieController');

router.get('/:id', embeddedMovieController.getSingleEmbeddedMovie);
router.get('/', embeddedMovieController.getAllEmbeddedMovies);

module.exports = router;