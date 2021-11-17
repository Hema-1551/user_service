const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')


//create new user in firestore
router.post('/signup',userController.create);

// find all users
router.get('/',userController.findAll);

//fetch user by id
router.get('/:id',userController.findById);

module.exports = router