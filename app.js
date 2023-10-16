const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", employeeRoutes);

mongoose
  .connect(`${process.env.DB_URL}mock-3`)
  .then(() => app.listen(process.env.PORT))
  .then(() => console.log(`Connected and listening on ${process.env.PORT}`))
  .catch((err) => console.log(err));
