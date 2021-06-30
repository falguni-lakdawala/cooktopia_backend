import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    hashPassword : {
        type : String
    },
    email : {
        type : String,
        required : true
    },
    created_date : {
        type : Date,
        default : Date.now
    },
    likes : [Number],
    dislikes : [Number]
})

UserSchema.methods.comparePassword = (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword);
}