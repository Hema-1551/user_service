const usersCollectionReference = require('../models/users')


//method to post the user
exports.createUser = async (req, res) => {
    //Reteriving user to check whether existing or not
    const user = await usersCollectionReference.find({ "userId": req.body.userId },
        {
            projection: {
                userId: 1
            }
            //only _id object id is projected 
        })

    const newUserRow = new usersCollectionReference(req.body)
    try {
        if (user.length === 0) {
            const savedUser = await newUserRow.save()
            res.status(200).json(savedUser)
        }
        else {

            res.send("UserId Existing already")
        }

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const filters = req.query.skills;

        const  users = [];// = new Set();
        
        filters.forEach(async function (skill) {
            
          const  user = await usersCollectionReference.find({ "skills": skill })
            console.log(user)
            users.push(...user);
        });
        
        console.log("printing final users")
        console.log(users)


        // const users = await usersCollectionReference.find()
        // const filteredUsers = []
        // users.forEach(function (user) {
        // await usersCollectionReference.find({ "skills": skill })
        //     const skill = user["skills"]

        //     skill.forEach(function (s) {
        //         if (s in filters) {
        //             filteredUsers.push(user)

        //         }
        //     })
        // });
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

/* 
For Ignore the request
//Id has to be deleted from the requests array.
Two Id's required: actual user Id and userId whom we want to cancel the request

id: is actual UserId,
requested_id: the one who have requested.
*/
exports.deleteRequestUserById = async (req, res) => {
    try {
        const user = await usersCollectionReference.find({ "userId": req.params.userId })
        const requestArray = user[0].requests;

        const updatedRequestsArray = requestArray.filter(function (value, index, requestArray) {
            console.log(value.userId)
            return value.userId !== req.params.requested_id;
        });

        // updating the requestedids array  in backend mongodb
        const updatedUser = await usersCollectionReference.findOneAndUpdate({ userId: req.params.userId },
            { requests: updatedRequestsArray }, { new: true });
        res.send(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
}

// Upon clicking on the request button ,
// UserID is added to the requests Array of the one who posted work
exports.requestForWork = async (req, res) => {
    try {
        const employerId = await usersCollectionReference.find({ "userId": req.params.employerId })

        const userId = req.params.userId;
        const workId = req.params.workId;
        const requestArray = employerId[0].requests;
        requestArray.push(
            { userId, workId }
        );
        const updatedUser = await usersCollectionReference.findOneAndUpdate({ userId: req.params.employerId },
            { requests: requestArray },
            { new: true });

        res.status(200).send(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
}

/*

1) get user details and remove request
2)push details to connections array 
3) update user 

*/
exports.connectUserFromRequests = async (req, res) => {
    try {
        //step 1
        const user = await usersCollectionReference.find({ "userId": req.params.userId })
        const requestArray = user[0].requests;


        const updatedRequestsArray = requestArray.filter(function (value, index, requestArray) {
            return value.userId !== req.params.workerId;
        });
        //step 2
        const userId = req.params.workerId;
        const workId = req.params.workId;
        const connectionsArray = user[0].connections;
        connectionsArray.push(
            { userId, workId }
        );

        //step 3
        const updatedUser = await usersCollectionReference.findOneAndUpdate(
            { userId: req.params.userId },
            {
                requests: updatedRequestsArray,
                connections: connectionsArray
            },
            { new: true });

        console.log(updatedUser)
        res.status(200).send(updatedUser)

    } catch (error) {
        res.status(500).json(error)
    }
}