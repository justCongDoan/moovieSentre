const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.post('/register', userController.registerUser);

router.post('/registerMany', userController.registerManyUsers)
router.post('/login', userController.userLogin);
router.post('/loginMany', userController.loginManyUsers)
router.delete('/deleteSingleUser/:id', userController.deleteSingleUser)
router.delete('/deleteUsers', userController.deleteUsers);
router.get('/:id', userController.getSingleUser);
router.get('/', userController.getAllUsers);

module.exports = router;