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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/src/pics/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const routes = (app) => {
  app
    .route("/recipes")
    // GET endpoint
    .get(getRecipes)

    // POST endpoint
    .post(upload.single("image"), async (req, res) => {
      let newRecipe = new Recipe({
        ...req.body,
        image: req.file ? req.file.filename : null,
      });

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
    .put(upload.single("image"), async (req, res) => {
      Recipe.findOneAndUpdate(
        { _id: req.params.RecipeId },
        {
          title: req.body.title,
          ingredient1: req.body.ingredient1,
          ingredient2: req.body.ingredient2,
          ingredient3: req.body.ingredient3,
          ingredient4: req.body.ingredient4,
          category: req.body.category,
          hardness: req.body.hardness,
          servings: req.body.servings,
          time: req.body.time,
          method: req.body.method,
          favourite: req.body.favourite,
          image: req.file ? req.file.filename : null,
        },
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
