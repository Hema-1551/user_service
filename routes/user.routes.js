const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')


//create new user in firestore
router.post('/signup',userController.createUser);

// find all users
router.get('/',userController.getAllUsers);

//fetch user by id
router.get('/:id',userController.getUserById);


//delete user by id
router.delete('/:id',userController.deleteUserById);



//Update user by id
router.put('/:id',userController.update_User_Details_ById);


//Fetching request to work using UserID
router.get('/:id/request',userController.getRequestedIdByuserId);

//Fetching request user by id
router.get('/:id/request/:requested_id',userController.getRequestedUserIdByUserId);

//Deleteing request user by id
router.delete('/:id/request/:requested_id',userController.deleteRequest_UserById);



module.exports = router