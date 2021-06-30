import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ShoppingCartSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    recipeID : {
        type : Number,
        required : true
    },
    recipeName : {
        type : String
    },
    imageURL : {
        type : String
    },
    ingrefients : [
        {
            ingredientName : String,
            ingredientId : Number,
            quantity : Number,
            unit : String
        }
    ]
})