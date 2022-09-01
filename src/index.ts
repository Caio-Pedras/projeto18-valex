import express, {json} from "express";
import "express-async-errors"
import cors from "cors";
import dotenv from "dotenv"
import router from "./routes/index.js"
dotenv.config();


const app=express();
app.use(json());
app.use(cors());
app.use(router)

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server up on port ${PORT}`)
})