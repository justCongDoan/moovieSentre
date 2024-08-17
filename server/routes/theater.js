const express = require('express');
const router = express.Router();
const theaterController = require('../controllers/theaterController');

router.post('/', theaterController.addNewTheater);
router.put('/updateTheaters', theaterController.updateTheaters);
router.delete('/deleteSingleTheater', theaterController.deleteSingleTheater);
router.delete('/deleteTheaters', theaterController.deleteTheaters);
router.get('/:id', theaterController.getSingleTheater);
router.get('/', theaterController.getAllTheaters);

module.exports = router;