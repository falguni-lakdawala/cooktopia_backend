import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

export const RecipesLikeSchema = new Schema({
    recipeId : {
        type : Number,
        required : true
    },
    likes : {
        type : Number
    },
    dislikes : {
        type : Number
    }
})
