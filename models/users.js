const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    //user can be anyone whoever posting or can accepting the work
    userId:{
        type:String,
        required:true
    },

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
    skills:{
        type:Array,
        "uniqueItems": true,
    },
    rating:{
        type:String
    },
    location:{
        type:Array,
        items:{
            type:Object,
            properties:{
                address:{
                    type:String,
                    required:true
                },
                longitude:{
                    type:String,
                    required:true
                },
                lattitude:{
                    type:String,
                    required:true
                }
            }
        }
    },
    requests:{
        type:Array,
        items:{
            type:Object,
            properties:{
                "userId":{
                    type:String,
                    required:true
                },
                "workId":{
                    type:String,
                    required:true
                }
            }
        }
    },
    connections:{
        type:Array,
        items:{
            type:Object,
            properties:{
                "userId":{
                    type:String,
                    required:true
                },
                "workId":{
                    type:String,
                    required:true
                }
            }
        }
    },
    invitations:{
        type:Array,
        items:{
            type:Object,
            properties:{
                "userId":{
                    type:String,
                    required:true
                },
                "workId":{
                    type:String,
                    required:true
                }
            }
        }
    },
    
},
{timestamps:true}
)

module.exports = mongoose.model('Users', usersSchema)