import mongoose from "mongoose";
import { RecipesLikeSchema } from "../models/recipesLikeModel.js";
import { UserSchema } from "../models/userModel.js";
import axios from "axios";
import { config } from "../assets/config.js";

const RecipesLikes = mongoose.model("RecipeLike", RecipesLikeSchema);
const User = mongoose.model("User", UserSchema);

const updateRecipeLikesCounter = (recipeID) => {
    RecipesLikes.find({ recipeID: recipeID },
      function(err, recipe) {
        if (err) {
          return err;
        } else {
          if(recipe != null && recipe != undefined && recipe.length > 0){
            RecipesLikes.updateOne({recipeID : recipeID},
            { likes : Number(recipe[0].likes) + 1, 
              dislikes : Number(recipe[0].dislikes) > 0 ? Number(recipe[0].dislikes) -1  : 0  },
            { upsert: true },
            (err, recipelike) => {
            if (err) {
              return err;
            }
            return recipelike;
          });
        }
        else{
          const newRecipeLike = new RecipesLikes({
            recipeID: recipeID,
            likes : 1,
            dislikes : 0
        });
      
          newRecipeLike.save();
        }
      }
    });
  };
  
const updateRecipeDislikesCounter = (recipeID) => {
    RecipesLikes.find({ recipeID: recipeID },
      function(err, recipe) {
        if (err) {
          return err;
        } else {
          if(recipe != null && recipe != undefined && recipe.length > 0){
            RecipesLikes.updateOne({recipeID : recipeID},
            { likes : Number(recipe[0].likes) > 0 ? Number(recipe[0].likes) -1  : 0, 
              dislikes :  Number(recipe[0].dislikes) + 1 },
            { upsert: true },
            (err, recipelike) => {
            if (err) {
              return err;
            }
            return recipelike;
          });
        }
        else{
          const newRecipeLike = new RecipesLikes({
            recipeID: recipeID,
            likes : 0,
            dislikes : 1
        });
      
          newRecipeLike.save();
        }
      }
    });
  };
  
export const getRecipeLikeDislikeCounter = (req, res) =>{
    RecipesLikes.find({ recipeID: req.params.recipeID },
      (err, recipelike) => {
      if (err) {
        res.send(err);
      }
      res.json(recipelike);
    });
  
};
  
export const updateLikeRecipe = (req, res) => {
  if(req.body.userID != null && req.body.userID != undefined){
      User.findOneAndUpdate  (
        { userID: req.body.userID },
        { $addToSet: { likes: req.body.recipeID  }, $pull: { dislikes : req.body.recipeID } },
        { multi : true, new :true },
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            updateRecipeLikesCounter(req.body.recipeID);
            console.log("result" + result);
            res.send(result);
          }
        }
    );
  }else
  {
      res.json('unauthorized access');
  }   
};

export const updateDislikeRecipe = (req, res) => {
  if(req.body.userID != null && req.body.userID != undefined){
    User.findOneAndUpdate  (
      { userID: req.body.userID },
      { $addToSet: { dislikes: req.body.recipeID  }, $pull: { likes : req.body.recipeID } },
      { multi : true },
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          updateRecipeDislikesCounter(req.body.recipeID);
          res.send(result);
        }
      }
    );
  }else
  {
      res.json('unauthorized access');
  }  
};
  
export const getFavoriteRecipes = async (req, res) => {
    let likeData = await User.find(
      { 'userID' : req.params.userID });
      
    if(likeData != null && likeData != undefined && likeData.length > 0){
      let recipeIds = likeData[0].likes;

      if(recipeIds != undefined && recipeIds.length > 0){
        let ids = recipeIds.join(",");
        axios
        .get(
          config.apiURL +
            "/informationBulk?apiKey=" +
            config.apiKey +
            "&ids=" + ids
        )
        .then((response) => {
          res.json(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      }
      else{
        res.json([]);
      }
    }
    else{
      res.json([]);
    }
};