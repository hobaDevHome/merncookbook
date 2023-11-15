import {
  addNewRecipe,
  getRecipes,
  getRecipeWithID,
  UpdateRecipe,
  deleteRecipe,
} from "../controllers/recipeControllers";
const multer = require("multer");
import { RecipeSchema } from "../models/recipeModel";
import mongoose from "mongoose";
const Recipe = mongoose.model("Recipe", RecipeSchema);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "../frontend/src/pics/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null, uniqueSuffix + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

const routes = (app) => {
  app
    .route("/recipes")
    // GET endpoint
    .get(getRecipes)

    // POST endpoint
    .post(async (req, res) => {
      let newRecipe = new Recipe(req.body);

      newRecipe.save((err, Recipe) => {
        if (err) {
          res.send(err);
        }
        res.json(Recipe);
      });
    });

  app
    .route("/recipe/:RecipeId")
    // Get specific recipe
    .get(getRecipeWithID)

    // update a specific recipe
    .put(async (req, res) => {
      Recipe.findOneAndUpdate(
        { _id: req.params.RecipeId },
        req.body,
        { new: true },

        (err, Recipe) => {
          if (err) {
            res.send(err);
          }
          res.json(Recipe);
        }
      );
    })

    // delete a specific recipe
    .delete(deleteRecipe);

  app.route("/fav/:RecipeId").put(UpdateRecipe);
};

export default routes;
