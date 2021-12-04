const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')


//create new user 
router.post('/signup',userController.createUser);

// find all users
router.get('/',userController.getAllUsers);

//fetch user by id
router.get('/:userId',userController.getUserById);


//delete user by id
router.delete('/:userId',userController.deleteUserById);



//Update user by id
router.put('/:userId',userController.updateUserDetailsById);


//Fetching request to work using UserID
router.get('/:userId/requests',userController.fetchRequestesOfuserId);

//Fetching request user by id
router.get('/:userId/requests/:requested_id',userController.getRequestedUserIdOfUser);

//Deleteing request user by id
router.delete('/:userId/requests/:requested_id',userController.deleteRequestUserById);

//request for work
router.post('/:userId/requestWork/:workId/:employerId', userController.requestForWork);

module.exports = router