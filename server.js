import express from "express";
import request from "express";
import mongoose from "mongoose";
import Cors from "cors";

import Cards from "./dbCards.js";

// App congig
const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://admin:akFcNJ8dlCerzSdY@cluster0.amfun.mongodb.net/tinderdb?retryWrites=true&w=majority`;

//middlewares
app.use(express.json());
app.use(Cors());

//DB congig
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//API EendPoints
app.get("/", (req, res) => res.status(200).send("hello world"));

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//Listerer
app.listen(port, () => console.log(`listening on localhost: ${port}`));
