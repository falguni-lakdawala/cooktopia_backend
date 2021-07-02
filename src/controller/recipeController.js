import mongoose from 'mongoose';
import { RecipesLikeSchema } from '../models/recipesLikeModel.js';
import axios from 'axios';
import { config } from '../assets/config.js';

const RecipesLikes = mongoose.model('Recipe', RecipesLikeSchema);

export const addNewRecipeLike = (req, res) =>{
    let newRecipeLike = new RecipesLikes(req.body);

    newRecipeLike.save((err, recipe) => {
        if(err){
            res.send(err);
        }
        res.json(recipe);
    })
}

export const getRecipes = (req, res) =>{
    
    // console.log('url ' + config.apiURL + '/complexSearch?apiKey=' + config.apiKey + '&cuisine=American');

    axios.get(config.apiURL + '/complexSearch?apiKey=' + config.apiKey + '&cuisine=American')
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        console.log(error);
    });
}

export const getRecipeById = (req, res) =>{

    axios.get(config.apiURL + '/' + req.params.recipeID + '/information?apiKey=' + config.apiKey + '&includeNutrition=true' )
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        console.log(error);
    });    
}

export const searchRecipe = (req, res) =>{

    axios.get(config.apiURL + '/complexSearch?apiKey=' + config.apiKey + '&number=12' + '&query=' + req.params.query)
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        console.log(error);
    });
}

export const randomRecipe = (req, res) =>{

    axios.get(config.apiURL + '/random?apiKey=' + config.apiKey + '&number=12')
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        console.log(error);
    });
}

export const updateRecipeLikes = (req, res) =>{
    RecipesLikes.findOneAndUpdate( { _id : req.params.recipeID }, req.body, 
        { new : true, useFindAndModify : false },
        (err, contact) => {
            if(err){
                res.send(err);
            }
        res.json(contact);
    })
}

export const deleteRecipeLikesById = (req, res) =>{
    RecipesLikes.remove( { _id : req.params.recipeID },
        (err, contact) => {
            if(err){
                res.send(err);
            }
        res.json({message : 'Recipe deleted successfully'});
    })
}