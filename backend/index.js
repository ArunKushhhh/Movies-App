import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

//Files
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

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
server.use("/api/v1/users", userRoutes);
server.use("/api/v1/genre", genreRoutes);
server.use("/api/v1/movies", moviesRoutes);
server.use("/api/v1/upload", uploadRoutes);

const __dirname = path.resolve();
server.use("/uploads", express.static(path.join(__dirname + "/uploads")));

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
