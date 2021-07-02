import { addNewRecipeLike, getRecipes, getRecipeById,
updateRecipeLikes, deleteRecipeLikesById, searchRecipe, randomRecipe  } from '../controller/recipeController.js';
import { login, loginRequired, register } from '../controller/userController.js'

const routes  = (app) =>{
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
}

export default routes;