import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
dotenv.config();
var app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandler);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("Server up on port ".concat(PORT));
});
