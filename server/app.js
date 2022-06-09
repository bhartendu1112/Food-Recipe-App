import express from 'express';
import dotenv from "dotenv";
import morgan from 'morgan';
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

// Config
dotenv.config()

// Database
import connectDatabase from "./config/dataBase.js";
connectDatabase();

// App Middlewares
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Route Imports
import userRoutes from "./routes/userRoutes.js";
app.use("/api", userRoutes);
import dishesRoutes from "./routes/dishesRoutes.js";
app.use("/api", dishesRoutes);

//database

app.listen(process.env.PORT, () => {
    console.log(`Server is running on localhost:${process.env.PORT}`)
});

