import { addNewRecipeLike, getRecipes, getRecipeById,
updateRecipeLikes, deleteRecipeLikesById  } from '../controller/recipeController.js';
import { login, loginRequired, register } from '../controller/userController.js'

const routes  = (app) =>{
    app.route('/recipes').get(getRecipes)
    .post(addNewRecipeLike)

    app.route('/recipe/:recipeID')
    .get( getRecipeById)
    .put( updateRecipeLikes)
    .delete(deleteRecipeLikesById);
}

export default routes;