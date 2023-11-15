import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import cors from "cors";
import routes from "./routes/recipeRouts";
const dotenv = require("dotenv");

const app = express();
const PORT = 4000;
dotenv.config();
const url = process.env.MONGO_URI || "";

// mongo connection
mongoose.Promise = global.Promise;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// bodyparser setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// CORS setup
app.use(cors());

routes(app);

app.get("/", (req, res) =>
  res.send(`Our application is running on port ${PORT}`)
);

app.listen(PORT, () => console.log(`Your server is running on port ${PORT}`));
