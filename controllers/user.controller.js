/*const admin = require('../firebase/firebase-config')

const db = admin.firestore();

const usersDb = db.collection('users');

exports.create = async (req, res) => {

    const body = req.body;

    const uid = body.uid;
    const username = body.username
    const mobile = body.mobile
    const email = body.email

    try {


        /*check if the document with the 
         requested uid is already present

        const user = await usersDb.doc(uid).get()

        if (!user.exists) {
            // new user so create a document

            const newUser = {
                username: username,
                email: email,
                mobile: mobile,
                uid: uid
            }

            const dbRes = await usersDb.doc(uid).set(newUser)

            res.status(200).send({
                message: 'user created successfully',
                dbRes: dbRes
            })
        }
        else {
            // user already exists

            res.status(400).send({
                user: user,
                message: 'user already exists'
            })
        }

    } catch (error) {

        res.status(500).send({
            message: 'internal server error',
            error: error
        })
    }

}

exports.findAll = async (req, res) => {
    try {

        //usersDb is the table of users
        const snapshot = await usersDb.get();
        if (snapshot.empty) {
            res.send({
                message: 'No users found',
                users: []
            })
        }

        res.send({
            users: snapshot.docs.map(doc => doc.data())
        }
            );

    } catch (error) {

        res.status(500).send({
            message: 'internal server error',
            error: error
        })
    }


}

exports.findById = async (req, res) => {

    try {
        const user = await usersDb.doc(req.params.id).get()

        console.log(user.exists)

        if (user.exists)
            res.send({user:user.data()})
        else
            res.send({message:"User Id is invalid"})
    } catch (error) {
        res.status(500).send({
            message: 'internal server error',
            error: error
        })
    }
}*/

const usersCollectionReference = require('../models/users')


//method to post the work
exports.createUser = async (req, res) => {

    const newUserRow = new usersCollectionReference(req.body)

    try {
        const savedUser = await newUserRow.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await usersCollectionReference.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }

}

exports.getUserById = async (req, res) => {

    try {
        const user = await usersCollectionReference.find({ "userId": req.params.userId })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }

}


exports.deleteUserById = async (req, res) => {
    try {
        const deletedUser = await usersCollectionReference.deleteOne({ "userId": req.params.userId })
        res.status(200).json(deletedUser)
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.update_User_Details_ById = async (req, res) => {
    try {
        const updatedUser = await usersCollectionReference.findOneAndUpdate({ userId: req.params.userId }, { $set: req.body }, { new: true })
        res.status(200).send({

            updatedUser: (updatedUser === null) ? "User doesnot exists" : updatedUser
        })
    }
    catch (error) {
        res.status(500).json(error)
    }

}

//Fetching request to work using UserID

//fetching Requests of User is working 
//fetching where userId is wrong or user id is not existing case (server is loading)
// not yet working
exports.fetchRequestesOfuserId = async (req,res) =>{
    try{
        const userInfo = await usersCollectionReference.find({"userId": req.params.userId }) 
        if(userInfo.exists)
        res.status(200).send({
            requestsId_array:(userInfo==null)?"No Requests":userInfo[0]['requests']
        })
        else
        requestsId_array="No Requests"
    }catch(error){
        res.status(500).json(error)
        
    }
}
// not yet working

exports.getRequestedUserIdByUserId = async (req,res) =>{
    try{
        const requestsId_array = await usersCollectionReference.find({ "userId": req.params.userId.body.requests }) 
        res.status(200).send({
            requestsId_array:(requestsId_array==null)?"no Requests":requestsId_array
        })
    }catch(error){
        res.status(500).json(error)
    }
}

// just copy pasted , not yet working
exports.deleteRequest_UserById = async (req,res) =>{
    try{
        const requestsId_array = await usersCollectionReference.find({ "userId": req.params.userId.body.connections }) 
        res.status(200).send({
            requestsId_array:(requestsId_array==null)?"no Requests":requestsId_array
        })
    }catch(error){
        res.status(500).json(error)
    }
}