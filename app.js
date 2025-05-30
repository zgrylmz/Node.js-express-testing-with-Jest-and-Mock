const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./Routes/usersRouter");
const authRouter = require("./Routes/authRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/users", authRouter);

app.get("/", (req, res) => {
  res.json("Hello");
});

module.exports = app;
