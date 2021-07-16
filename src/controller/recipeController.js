import mongoose from "mongoose";
import axios from "axios";
import { config } from "../assets/config.js";


export const getRecipes = (req, res) => {
  // console.log('url ' + config.apiURL + '/complexSearch?apiKey=' + config.apiKey + '&cuisine=American');

    let num  = 0;
    req.query.number ? num = req.query.number : num = 20;
    axios.get(config.apiURL + '/complexSearch?apiKey=' + config.apiKey +
     '&number=' + num  +
     '&cuisine=American')
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        console.log(error);
    });
};

export const getRecipeById = (req, res) => {
  axios
    .get(
      config.apiURL +
        "/" +
        req.params.recipeID +
        "/information?apiKey=" +
        config.apiKey +
        "&includeNutrition=true"
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const searchRecipe = (req, res) => {
  axios
    .get(
      config.apiURL +
        "/complexSearch?apiKey=" +
        config.apiKey +
        "&number=20&addRecipeInformation=true" +
        "&query=" +
        req.params.query
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const randomRecipe = (req, res) => {
  let num  = 0;
  req.query.number ? num = req.query.number : num = 20;

  axios
    .get(config.apiURL + "/random?apiKey=" + config.apiKey + "&number=" + num)
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};


export const recipeClasificationSearch = (req, res) =>{

  console.log('query : '); console.log(req.query);
  let query = '';

  if(req.query.cuisine){
    query +='&cuisine=' + req.query.cuisine;
  }
  if(req.query.diet){
    query += '&diet=' + req.query.diet;
  }
  if(req.query.ingredient){
    query += '&includeIngredients=' + req.query.ingredient;
  }

  if(req.query.intolerances){
    query += '&intolerances=' + req.query.intolerances;
  }

  if(req.query.mealtype){
    query += '&type=' + req.query.mealtype;
  }

  if(req.query.number){
    query += '&number=' + req.query.number;
  }
  else{
    query += '&number=20';
  }
  
  axios
    .get(
      config.apiURL +
        "/complexSearch?apiKey=" +
        config.apiKey +
        query
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
  });
}