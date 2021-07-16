import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ShoppingCartSchema = new Schema({
    uniqueID : {
        type : String,
        required : true
    },
    userID : {
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
    ingredients : [
        {
            ingredientName : String,
            ingredientId : Number,
            quantity : Number,
            unitofMeasure : String
        }
    ]
})