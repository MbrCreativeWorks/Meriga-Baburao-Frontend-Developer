import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import capsuleRouts from "./routes/capsules.js";

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use("/", capsuleRouts);

app.get("/", (req, res) => {
  res.send("Hello from spaceX");
});
app.all("/", (req, res) => {
  res.send("Route Doesn't Exist");
});
app.listen(port, () => {
  console.log(`Server is Listening On port: http://localhost:${port}`);
});
