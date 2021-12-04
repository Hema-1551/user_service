const usersCollectionReference = require('../models/users')


//method to post the user
exports.createUser = async (req, res) => {
    //Reteriving user to check whether existing or not
    const user = await usersCollectionReference.find({ "userId": req.body.userId })
    const newUserRow = new usersCollectionReference(req.body)

    try {
        if (!user) {
            const savedUser = await newUserRow.save()
            res.status(200).json(savedUser)
        }
        else
            res.send("UserId Existing already")
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
        console.log("Deleted")
        res.status(200).json(deletedUser)
    } catch (error) {
        res.status(500).json(error)
    }
}


exports.updateUserDetailsById = async (req, res) => {
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

exports.fetchRequestesOfuserId = async (req, res) => {

    try {
        const userInfo = await usersCollectionReference.find({ "userId": req.params.userId })

        if (userInfo) {
            res.status(200).send({
                requestsId_array: (userInfo[0]['requests'].length == 0) ? "No Request's Exists" : userInfo[0]['requests']
            })
        }
        else
            res.status(200).send("No Requests Exists")
    } catch (error) {
        res.status(500).json(error)

    }
}


exports.getRequestedUserIdOfUser = async (req, res) => {
    try {
        const user = await usersCollectionReference.find({ "userId": req.params.requested_id })
        res.status(200).send({
            user
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

/* just copy pasted , not yet working
//For Ignore the request
//Id has to be deleted from the requests array.
Two Id's required: actual user Id and userId whom we want to cancel the request

id: is actual UserId,
requested_id: the one who have requested.
*/
exports.deleteRequest_UserById = async (req, res) => {
    try {


        const user = await usersCollectionReference.find({ "userId": req.params.userId })
        const requestArray = user[0].requests;

        const updatedRequestsArray = requestArray.filter(function (value, index, requestArray) {
            return value !== req.params.requested_id;
        });


        res.send(updatedRequestsArray)

        //updating the requestedids array  in backend mongodb
        const updatedUser = await usersCollectionReference.findOneAndUpdate({ userId: req.params.userId },
            { $set: requests : updatedRequestsArray }, { new: true })


        // Memo.updateOne(
        //   { "_id" : ObjectId("5b8e83957d56e802274d6") },
        //   { $set: { "text" : "updated" } });

        // user.requests].remove(req.params.requested_id)
        // const savedUser = await user.save()
        // res.status(200).send({
        //     requestsId_array: (requestsId_array == null) ? "no Requests" : requestsId_array
        // })
    } catch (error) {
        res.status(500).json(error)
    }
}

