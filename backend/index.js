import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

//Files
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import genreRoutes from './routes/genreRoutes.js'
import moviesRoutes from './routes/moviesRoutes.js'

//configuration
dotenv.config();
connectDB();

const server = express();

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

const PORT = process.env.PORT || 3000;

//routes
server.use('/api/v1/users', userRoutes)
server.use('/api/v1/genre', genreRoutes)
server.use('/api/v1/movies', moviesRoutes)

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
