const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
//Routes
const userRoute = require("./Routes/userRoute");
const authRoute = require("./Routes/authRoute");
dotenv.config();
const app = express();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("database connected");
  app.listen(3000, () => {
    console.log("started");
  });
});
//middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use("/api/users/", userRoute);
app.use("/api/auth/", authRoute);
app.get("/", (req, res) => {
  res.send("hello");
});
