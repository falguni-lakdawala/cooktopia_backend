import mongoose from "mongoose";
import { UserSchema } from "../models/userModel.js";
import axios from "axios";
import { config } from "../assets/config.js";


export const getRecipes = (req, res) => {
  // console.log('url ' + config.apiURL + '/complexSearch?apiKey=' + config.apiKey + '&cuisine=American');

  if(req.session != null && req.session != undefined){
    console.log('current user : ' + req.session.user.email);
    
    axios.get(config.apiURL + '/complexSearch?apiKey=' + config.apiKey + '&cuisine=American')
    .then(response => {
        res.json(response.data);
    })
    .catch(error => {
        console.log(error);
    });
  }
  else
  {
      res.redirect('/');
      // res.json('unauthorized access');
  }
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
        "&number=20" +
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
  axios
    .get(config.apiURL + "/random?apiKey=" + config.apiKey + "&number=20")
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
