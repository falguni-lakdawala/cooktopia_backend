# cooktopia_backend

 ## API urls : 
 
  1. localhost:5000/recipes?number=10 - home page recipe list
  2. localhost:5000/recipes/random?number=10 - random recipes
  3. localhost:5000/recipes/{ searchQuery for ex. pasta} - search box
     localhost:5000/recipes/pasta
  4. localhost:5000/recipe/644581 - recipe content information
  5. http://localhost:5000/login - google login and register/create user in mongo if user doesn't exist in the system
  6. http://localhost:5000/logout - logout from the user and destory user session
  
  ------------Start classification APIS-------------------
  7. localhost:5000/recipeclassification?intolerances=Peanut&number=10 - get recipe based on intolerance or allergy
  8. localhost:5000/recipeclassification?diet=vegan&number=10 - search recipe based on diet type
  9. localhost:5000/recipeclassification?cuisine=american&number=10 - search recipe based on cusine type
  10. localhost:5000/recipeclassification?mealtype=breakfast&number=10 - search recipe based on meal type
  11. localhost:5000/recipeclassification?ingredient=chicken&number=10 - search recipe based on ingredients
  ------------End classification APIS-------------------

12. localhost:5000/getuser - to get user info about logged in user(it will return user only if user is login otherwise null)


-----------Start Shopping cart related APIS ------------------

14. http://localhost:5000/recipecart/addrecipecart -  Add recipe to shopping cart
15. method(POST) 

{

}

17. http://localhost:5000/recipecart/updaterecipecart - Update recipe to shopping cart
18. PUT
-----request body : 
{
    "recipeID" : "100025",
    "recipeName" : "Beer Braised Brats Sandwich",
   "imageURL" : "https://spoonacular.com/recipeImages/100023-556x370.jpeg",
  "ingredients" : [
  {
         "id" : 10414003,
         "ingredientName" : "Alcoholic Beverages",
         "quantity" : 2,
        "unitofMeasure" : "pint"
  },
{
         "id" : 1022030,
         "ingredientName" : "Spices and Seasonings",
         "quantity" : 1,
        "unitofMeasure" : "teaspoon"
  },
{
         "id" : 10414003,
         "ingredientName" : "vidalia onion",
         "quantity" : 2,
        "unitofMeasure" : "large"
  }

  ]

} 

16. http://localhost:5000/recipecart/deleterecipecart - delete recipe from shopping cart
----request body
{
    "recipeID" : "100025"
}

17. http://localhost:5000/recipecartlist - list of recipes indside shopping cart
18. method(GET)

18. http://localhost:5000/recipecart/:recipeID - individual recipe from shopping cart

-------------End Shopping Cart related APIs --------------------------


-------------Start Recipe Like/Dislike related APIs---------------

18. http://localhost:5000/recipe/updaterecipelike - update like to individual recipe
PUT
{
    "recipeID" : "100025"
}

19. http://localhost:5000/recipe/updaterecipedislike - update dislike to individual recipe
20. PUT
{
    "recipeID" : "100025",
    userID
}

20. http://localhost:5000/recipe/getrecipelikedislike/:id - get individual recipe liked or diliked status for individual user 
21. method:
22. {
userID:
}

21. http://localhost:5000/recipe/getRecipeLikeDislikeCounter/:recipeID/:id - get recipe like and dislike count for individual recipe
http://localhost:5000/recipe/getRecipeLikeDislikeCounter/100352

-------------End Recipe Like/Dislike related APIs---------------

