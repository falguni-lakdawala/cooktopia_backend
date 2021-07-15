import { getRecipes, getRecipeById, 
    searchRecipe, randomRecipe, recipeClasificationSearch  } from '../controller/recipeController.js';
import {updateLikeRecipe, updateDislikeRecipe, 
    getRecipeLikeDislike, getRecipeLikeDislikeCounter} from '../controller/recipeLikeController.js';
import { addRecipetoCart, deleteCartByRecipeID, getCartByRecipeID,
    getShoppingCartList, updateCartByRecipeID} from '../controller/shoppingCartController.js';
import passport from 'passport';
import { getUserInfo }from '../controller/passport.js'; 
import  session from 'express-session';
import MongoStore  from 'connect-mongo';
import { config } from '../assets/config.js';


const routes  = (app) =>{

    app.use(
        session({
          secret: 'cooktopia',
          resave: false,
          saveUninitialized: false,
          store: new MongoStore({ mongoUrl: config.connectionString,
            ttl : 24 * 60 * 60,
            autoRemove : 'native' 
          })
        })
    )

    app.route('/recipes')
    .get(getRecipes)

    app.route('/recipes/random')
    .get(randomRecipe)

    app.route('/recipe/updaterecipelike')
    .put(updateLikeRecipe)

    app.route('/recipe/updaterecipedislike')
    .put(updateDislikeRecipe)

    app.route('/recipe/getrecipelikedislike/:recipeID/:id')
    .get(getRecipeLikeDislike)

    app.route('/recipe/getRecipelikedislikecounter/:recipeID')
    .get(getRecipeLikeDislikeCounter)

    app.route('/recipes/:query')
    .get(searchRecipe)

    app.route('/recipeclassification')
    .get(recipeClasificationSearch)

    app.route('/recipe/:recipeID')
    .get( getRecipeById)

    app.route('/recipecartlist')
    .get(getShoppingCartList)

    app.route('/recipecart/:recipeID/:id')
    .get(getCartByRecipeID)

    app.route('/recipecart/addrecipecart')
    .post(addRecipetoCart)
    
    app.route('/recipecart/updaterecipecart')
    .put(updateCartByRecipeID)

    app.route('/recipecart/deleterecipecart')
    .delete(deleteCartByRecipeID)

    app.route('/login')
    .get(passport.authenticate('google', {scope : ['profile', 'email']}),
        (req, res) => {
            console.log('login info : ');
            console.log(req.session.user);
            res.send(req.session.user);
        }
    )

    app.route('/login/callback')
        .get(passport.authenticate('google', { 
            failureRedirect: 'http://cooktopia.s3-website-us-west-2.amazonaws.com' }), 
        (req, res) => {
            console.log('session info : ');
            console.log(req.session.passport.user);
            if(req.session.passport.user != null){
                req.session.user = req.session.passport.user;
                
                console.log(req.session.user);
                req.session.save((err) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log('session saved successfully');
                    }
                })
            }
            res.redirect('http://cooktopia.s3-website-us-west-2.amazonaws.com/home')
            // res.send(req.session.user);
        }
    )
      
    app.route('/logout').get((req, res) => {
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            console.log('logged out successfully');
            res.send('success');
        });
    })      

    app.route('/getuser').get(getUserInfo);
    
}

export default routes;