import Movie from "../models/movies.js";

import asyncHandler from "../middlewares/asyncHandler.js";

//Create Movie
const createMovie = asyncHandler(async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

//Get All Movies
const getAllMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

//Get Specific Movie
const getSpecificMovie = asyncHandler(async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

//Update Movie
const updateMovie = asyncHandler(async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedMovie);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

//Moviw Review
const movieReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      const alreadyReviewed = movie.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        return res.status(400).json({ message: "Movie already reviewed" });
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      movie.reviews.push(review);
      movie.numReviews = movie.reviews.length;
      movie.rating =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      await movie.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

//Delete Movie
const deleteMovie = asyncHandler(async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json({ message: "Movie deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

//Delete Comment
const deleteComment = asyncHandler(async (req, res) => {
  try {
    const { movieId, reviewId } = req.body;
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const review = movie.reviews.find((r) => r._id.toString() === reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    const index = movie.reviews.indexOf(review);
    movie.reviews.splice(index, 1);
    movie.numReviews = movie.reviews.length;
    movie.rating =
      movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
      movie.reviews.length;
    await movie.save();
    res.json({ message: "Review deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

//Get New Movies
const getNewMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 }).limit(10);
    res.json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

//Get Top Movies
const getTopMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.find().sort({ rating: -1 }).limit(10);
    res.json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

//Get Random Movies
const getRandomMovies = asyncHandler(async (req, res) => {
  try {
    const movies = await Movie.aggregate([{ $sample: { size: 10 } }]);
    res.json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

export {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies
};
