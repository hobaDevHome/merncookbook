import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const RecipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  ingredient1: {
    type: String,
    required: true,
  },
  ingredient2: {
    type: String,
  },
  method: {
    type: String,
    required: true,
  },
  ingredient3: {
    type: String,
  },
  ingredient4: {
    type: String,
  },
  servings: {
    type: Number,
  },
  time: {
    type: Number,
  },
  hardness: {
    type: Number,
    enum: [1, 2, 3],
  },
  category: {
    type: String,
    default: "all",
  },
  favourite: {
    type: Boolean,
    default: false,
  },
});
