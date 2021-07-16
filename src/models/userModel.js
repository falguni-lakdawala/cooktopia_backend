import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    userID : {
        type : String,
        required : true
    },
    displayName : {
        type : String
    },
    firstName : {
        type : String
    },
    lastName : {
        type : Date
    },
    email :{
        type : String
    },
    image : {
        type: String
    },
    createAt : {
        type : Date,
        default : Date.now
    },
    likes : {
        type:  Array //array of liked recipe ids
    }, 
    dislikes : {
        type:  Array //array of disliked recipe ids
    } 
})
