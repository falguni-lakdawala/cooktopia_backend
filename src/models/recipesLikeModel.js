import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

export const RecipesLikeSchema = new Schema({
    recipeID : {
        type : Number,
        required : true
    },
    likes : {
        type : Number,
        default : 0 //counter to add when someone likes recipe
    },
    dislikes : {
        type : Number,
        default : 0 //counter to add when someone dislikes recipe
    }
})
