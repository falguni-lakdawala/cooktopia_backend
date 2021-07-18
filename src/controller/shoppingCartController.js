import mongoose from "mongoose";
import { ShoppingCartSchema } from "../models/shoppingCartModel.js";


const ShoppingCart = mongoose.model("ShoppingCart", ShoppingCartSchema);

export const addRecipetoCart = async (req, res) => {

    if(req.body.userID != null && req.body.userID != undefined){

        let uniqueID = req.body.userID + '-' + req.body.recipeID;
        let cart = await ShoppingCart.find({ uniqueID : uniqueID });
        if(cart != undefined && cart.length > 0){
            res.send(cart);
        }
        else{
            const newRecipetoCart = new ShoppingCart({
                uniqueID : uniqueID,
                userID : req.body.userID,
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
  
    }else
    {
        res.json('unauthorized access');
    }   
}

export const getCartByRecipeID = (req, res) => {
    ShoppingCart.find({
        uniqueID : req.params.userID + '-' + req.params.recipeID
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

    if(req.body.userID != null && req.body.userID != undefined ){
        let uniqueID = req.body.userID + '-' + req.body.recipeID;
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
    else{
        res.json('unauthorized access');
    }  
}

export const deleteCartByRecipeID = (req, res) => {
    if(req.body.userID != null && req.body.userID != undefined){
        ShoppingCart.deleteOne({ uniqueID: req.body.userID + '-' + req.body.recipeID }, 
        function (err, result) {
            if(err) {
                res.send(err);
            }
            else{
                res.send(true);
            }
        });
    }
    else{
        res.json('unauthorized access');
    } 
}

export const getShoppingCartList = (req, res) => {
    ShoppingCart.find({ userID : req.params.userID }, function(err, result) {
        if(err) {
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
}