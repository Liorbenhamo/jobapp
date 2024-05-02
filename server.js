const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const usersRoutes = require("./routes/userroutes");

mongoose
  .connect(process.env.MONGO_CONNECTOR, {})
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Unable to connect to MongoDB Atlas");
    console.error(err.message);
  });
app.use(express.json());
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
console.log("hi");
app.use("/users", usersRoutes);

app.listen(3000, () => console.log("server is running on port 3000"));
