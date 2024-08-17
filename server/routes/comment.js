const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/addSingleComment', commentController.addNewSingleComment);
router.post('/', commentController.addNewComments);
router.put('/updateSingleComment/:id', commentController.updateSingleComment);
router.put('/updateComments', commentController.updateComments);
router.delete('/deleteSingleComment/:id', commentController.deleteSingleComment);
router.delete('/deleteComments', commentController.deleteComments);
router.get('/:id', commentController.getSingleComment);
router.get('/', commentController.getAllComments);

module.exports = router;