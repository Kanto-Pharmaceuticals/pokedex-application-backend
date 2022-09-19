const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/error-middleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 3000;

connectDB();

const app = express();

/* Middleware to parse json data from req body*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/pokemon", require("./routes/pokemon-routes"));
app.use("/api/trainers", require("./routes/trainer-routes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
