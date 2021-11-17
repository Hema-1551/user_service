const admin = require('../firebase/firebase-config')

const db = admin.firestore(); 

const usersDb = db.collection('users'); 

exports.create =  async (req , res) => {

    const body = req.body;

    const uid =  body.uid;
    const username =  body.username
    const mobile = body.mobile
    const email = body.email

   try {
      
      
    // check if the document with the 
    // requested uid is already present

    const user = await usersDb.doc(uid).get()

    if(!user.exists)
    {
        // new user so create a document

        const newUser  = {
            username: username,
            email: email,
            mobile: mobile,
            uid:uid
        }

        const dbRes = await usersDb.doc(uid).set(newUser)
         
        res.status(200).send({
            message:'user created successfully',
            dbRes:dbRes
        })
    }
    else
    {
        // user already exists

        res.status(400).send({
            user:user,
            message:'user already exists'
        })
    }
    
   } catch (error) {
         
        res.status(500).send({
            message:'internal server error',
            error:error
        })
    }
  
}

exports.findAll = (req , res) => {
    res.send('finding all users')
}

exports.findById = (req , res) => {
    res.send(`find user by id ${req.params.id}`)
}