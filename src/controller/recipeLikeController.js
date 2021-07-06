import mongoose from "mongoose";
import { RecipesLikeSchema } from "../models/recipesLikeModel.js";
import { UserSchema } from "../models/userModel.js";


const RecipesLikes = mongoose.model("RecipeLike", RecipesLikeSchema);
const User = mongoose.model("User", UserSchema);

const updateRecipeLikesCounter = (recipeID) => {
    RecipesLikes.find({ recipeID: recipeID },
      function(err, recipe) {
        if (err) {
          res.send(err);
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
  
const updateRecipeDislikesCounter = async (recipeID) => {
    RecipesLikes.find({ recipeID: recipeID },
      function(err, recipe) {
        if (err) {
          res.send(err);
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
  
      User.findOneAndUpdate  (
        { email: req.session.user.email },
        { $addToSet: { likes: req.body.recipeID  }, $pull: { dislikes : req.body.recipeID } },
        { multi : true },
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            updateRecipeLikesCounter(req.body.recipeID);
            res.send(result);
          }
        }
    );
};

export const updateDislikeRecipe = (req, res) => {
  
    User.findOneAndUpdate  (
      { email: req.session.user.email },
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
};
  
export const getRecipeLikeDislike = async (req, res) => {
    let like = false, dislike = false;
    let likeData = await User.find(
      { 'email' : req.session.user.email,  'likes' :  req.params.recipeID  });
  
    let dislikeData = await User.find(
        { 'email' : req.session.user.email,  'dislikes' :  req.params.recipeID  });
      
    if(likeData != null && likeData != undefined && likeData.length > 0){
      like = true;
    }
    
    if(dislikeData != null && dislikeData != undefined && dislikeData.length > 0){
      dislike = true;
    }
      
    let json = {
      'like' : like, 'dislike' : dislike
    }
  
    res.json(json);
  
};