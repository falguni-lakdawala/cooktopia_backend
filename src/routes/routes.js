import { addNewRecipeLike, getRecipes, getRecipeById,
updateRecipeLikes, deleteRecipeLikesById, searchRecipe, 
randomRecipe  } from '../controller/recipeController.js';
import passport from 'passport';
import  session from 'express-session';
import MongoStore  from 'connect-mongo';


const routes  = (app) =>{

    app.use(
        session({
          secret: 'cooktopia',
          resave: false,
          saveUninitialized: false,
          store: new MongoStore({ mongoUrl: 'mongodb://localhost:27017/cooktopiaDB',
            ttl : 24 * 60 * 60,
            autoRemove : 'native' 
          })
        })
    )

    app.route('/recipes')
    .get(getRecipes)
    .post(addNewRecipeLike)

    app.route('/recipes/random')
    .get(randomRecipe)

    app.route('/recipes/:query')
    .get(searchRecipe)

    app.route('/recipe/:recipeID')
    .get( getRecipeById)
    .put( updateRecipeLikes)
    .delete(deleteRecipeLikesById);

    app.route('/login')
    .get(passport.authenticate('google', {scope : ['profile', 'email']}),
        (req, res) => {
            // console.log(req.session.user);
        }
    )

    app.route('/login/callback')
        .get(passport.authenticate('google', { 
            failureRedirect: 'http://facebook.com/' }), 
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
            res.redirect('http://google.com/')

        }
    )
      
    app.route('/logout').get((req, res) => {
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            console.log('logged out successfully');
            res.redirect('/');
        });
    })
      
    
}

export default routes;