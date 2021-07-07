import mongoose from "mongoose";
import { ShoppingCartSchema } from "../models/shoppingCartModel.js";
import { UserSchema } from "../models/userModel.js";


const ShoppingCart = mongoose.model("ShoppingCart", ShoppingCartSchema);
const User = mongoose.model("User", UserSchema);

export const addRecipetoCart = (req, res) => {

    const newRecipetoCart = new ShoppingCart({
        uniqueID : req.session.user.email + '-' + req.body.recipeID,
        email : req.session.user.email,
        recipeID: req.body.recipeID,
        recipeName : req.body.recipeName,
        imageURL : req.body.imageURL,
        ingredients : req.body.ingredients
    });
  
    newRecipetoCart.save(function(err, result) {
        if (err){
            res.send(err);
        } else{
            res.send(result);
        }
    });
      
}

export const getCartByRecipeID = (req, res) =>{
    ShoppingCart.find({
        uniqueID : req.session.user.email + '-' + req.params.recipeID
    }, (err, cart) =>{
        if(err){
            res.send(err);
        }
        else{
            res.send(cart);
        }
    })
}

export const updateCartByRecipeID = (req, res) => {
    let uniqueID = req.session.user.email + '-' + req.body.recipeID;
    console.log(uniqueID);
    ShoppingCart.findOneAndUpdate  (
        { uniqueID : uniqueID },
        { ingredients : req.body.ingredients },
        { multi : true, new : true },
        function(err, result) {
          if (err) {
              console.log("err " + err);
            res.send(err);
          } else {
              console.log("result " + result);
            res.send(result);
          }
        }
    );
}

export const deleteCartByRecipeID = (req, res) => {
    ShoppingCart.deleteOne({ uniqueID: req.session.user.email + '-' + req.body.recipeID }, function (err, result) {
        if(err) {
            res.send(err);
        }
        else{
            res.send(true);
        }
    });
}

export const getShoppingCartList = (req, res) => {
    ShoppingCart.find({ email : req.session.user.email }, function(err, result) {
        if(err) {
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
}