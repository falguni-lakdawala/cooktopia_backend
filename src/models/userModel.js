import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    googleId : {
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
    likes : [Number],
    dislikes : [Number]
})
