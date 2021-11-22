const admin = require('../firebase/firebase-config')

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
         requested uid is already present*/

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


   
}