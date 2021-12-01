const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    //user can be anyone whoever posting the work
    userId:{
        type:String,
        required:true
    },

    /*
     username: username,
                email: email,
                mobile: mobile,
                uid: uid*/
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },

    mobile:{
        type:Number,
        required:true,
        length:10
    },
    requests:{
        type:Array,
    },
    connections:{
        type:Array,
        default:[123,234]
    },
    invitations:{
        type:Array,
        default:[]
    }

},
{timestamps:true}
)

module.exports = mongoose.model('Users', UsersSchema)