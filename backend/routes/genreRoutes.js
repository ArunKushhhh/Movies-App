import express from "express";
const router = express.Router();

//controllers
import {
  createGenre,
  updateGenre,
  deleteGenre,
  listGenres,
  readGenre
} from "../controllers/genreController.js";
//middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, authorizeAdmin, createGenre);
router.route("/:id").put(authenticate, authorizeAdmin, updateGenre);
router.route("/:id").delete(authenticate, authorizeAdmin, deleteGenre);
router.route("/genres").get(listGenres);
router.route("/:id").get(readGenre)

export default router;
