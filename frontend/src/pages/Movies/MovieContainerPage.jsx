import React, { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../app/api/movies";
import { useFetchGenresQuery } from "../../app/api/genre";
import SliderUtil from "../../components/SliderUtil";

const MovieContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between items-center">
      <nav className="ml-[4rem] flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row">
        {genres?.map((genre) => (
          <button
            key={genre._id}
            className={`transition duration-300 ease-in-out hover:bg-gray-200 p-2 rounded mb-[1rem] text-lg ${
              selectedGenre === genre._id ? "bg-gray-200" : ""
            }`}
            onclick={() => handleGenreClick(genre._id)}
          >
            {genre.name}
          </button>
        ))}
      </nav>

      <section className="flex flex-col justify-center items-center w-full lg:w-auto">
        <div className="w-full lg:w-[100rem] mb-8">
          <h1 className="mb-5 text-2xl font-bold">Choose For You</h1>
          <SliderUtil data={randomMovies} />
        </div>

        <div className="w-full lg:w-[100rem] mb-8">
          <h1 className="mb-5 text-2xl font-bold">Top Movies</h1>
          <SliderUtil data={topMovies} />
        </div>

        <div className="w-full lg:w-[100rem] mb-8">
          <h1 className="mb-5 text-2xl font-bold">Choose Movie</h1>
          <SliderUtil data={filteredMovies} />
        </div>
      </section>
    </div>
  );
};

export default MovieContainerPage;
