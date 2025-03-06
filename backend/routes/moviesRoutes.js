import express from "express";
const router = express.Router();

//Controllers
import { createMovie, getAllMovies, getSpecificMovie, updateMovie, movieReview, deleteMovie } from "../controllers/movieController.js";

//Middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

//Public Routes
router.get("/all-movies", getAllMovies);
router.get("/specific-movie/:id", getSpecificMovie)

//Restricted Routes
router.post('/:id/reviews', authenticate, checkId, movieReview);

//Admin Routes
router.post('/create-movie', authenticate, authorizeAdmin, createMovie);
router.put('/update-movie/:id', authenticate, authorizeAdmin, updateMovie);
router.delete('/delete-movie/:id', authenticate, authorizeAdmin, deleteMovie);
export default router;