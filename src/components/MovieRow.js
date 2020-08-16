import React, { useEffect, useState } from "react";
import axios from "axios";
import Movie from "./Movie";

export default function MovieRow({ genre, selectMovie }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getMovies() {
      const res = await axios({
        method: "get",
        url: `https://api.themoviedb.org/3/discover/movie?api_key=316b1b6ab5e4d09f42c1a134f380e6e2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre.id}`,
      });

      const movies = await res.data.results;

      setMovies(movies.slice(0, 8));
      setLoading(false);
    }
    setLoading(true);
    getMovies();
  }, [genre.id]);

  if (loading) return <div className="movie-row">Loading...</div>;

  return (
    <div className="movie-row" id={genre.name}>
      <h1>{genre.name}</h1>
      <div className="movies">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} selectMovie={selectMovie} />
        ))}
      </div>
    </div>
  );
}
