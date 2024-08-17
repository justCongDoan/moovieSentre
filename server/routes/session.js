const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/:id', sessionController.getSingleSession);
router.get('/', sessionController.getAllSessions);

module.exports = router;