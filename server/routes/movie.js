const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.post('/', movieController.addNewMovie);
router.put('/updateMovies', movieController.updateMovies)
router.delete('/deleteMovies', movieController.deleteMovies)
router.delete('/deleteSingleMovie/:id', movieController.deleteSingleMovie)
router.get('/:id', movieController.getSingleMovie);
router.get('/', movieController.getAllMovies);
router.get('/search/getMoviesByFilters', movieController.getMoviesByFilters);

module.exports = router;