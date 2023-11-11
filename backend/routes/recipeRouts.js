import {
  addNewRecipe,
  getRecipes,
  getRecipeWithID,
  UpdateRecipe,
  deleteRecipe,
} from "../controllers/recipeControllers";

const routes = (app) => {
  app
    .route("/recipes")
    // GET endpoint
    .get(getRecipes)

    // POST endpoint
    .post(addNewRecipe);

  app
    .route("/recipe/:RecipeId")
    // Get specific recipe
    .get(getRecipeWithID)

    // update a specific recipe
    .put(UpdateRecipe)

    // delete a specific recipe
    .delete(deleteRecipe);
};

export default routes;
