import { createSlice } from "@reduxjs/toolkit";
import { set } from "mongoose";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    moviesFilter: {
      searchTerm: "",
      selectedGenre: "",
      selectedYear: "",
      selectedSort: [],
    },
    filteredMovies: [],
    movieYears: [],
    uniqueYears: [],
  },

  reducers: {
    setMoviesFilter(state, action) {
      state.moviesFilter = { ...state.moviesFilter, ...action.payload };
    },
    setFilteredMovies(state, action) {
      state.filteredMovies = action.payload;
    },
    setMoviesYears(state, action) {
      state.movieYears = action.payload;
    },
    setUniqueYears(state, action) {
      state.uniqueYears = action.payload;
    },
  },
});

export const {
  setMoviesFilter,
  setFilteredMovies,
  setMoviesYears,
  setUniqueYears,
} = moviesSlice.actions;

export default moviesSlice.reducer;
