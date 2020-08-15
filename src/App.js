import React, { useState, useEffect } from "react";
import "./App.scss";
import Movie from "./components/Movie";
import axios from "axios";
import fetchMovieTrailerId from "movie-trailer";
import YouTube from "react-youtube";

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movieTrailerId, setMovieTrailerId] = useState("");

  function onMovieClicked(movie) {
    selectMovie(movie.title);
  }

  async function selectMovie(title) {
    try {
      const trailer_id = await fetchMovieTrailerId(title, {
        id: true,
      });

      setMovieTrailerId(trailer_id);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    async function getGenres() {
      const res = await axios({
        method: "get",
        url:
          "https://api.themoviedb.org/3/genre/movie/list?api_key=316b1b6ab5e4d09f42c1a134f380e6e2&language=en-US",
      });

      const genres = await res.data;
      console.log("genres: ", genres);
      setGenres(genres);
    }

    async function getMovies() {
      const res = await axios({
        method: "get",
        url:
          "https://api.themoviedb.org/3/movie/top_rated?api_key=316b1b6ab5e4d09f42c1a134f380e6e2&language=en-US&page=3",
      });

      const movies = await res.data.results;
      console.log("movies: ", movies);
      setMovies(movies);
      selectMovie(movies[0].title);
    }
    getGenres();
    getMovies();
  }, []);

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  return (
    <div className="app">
      <div className="nav">
        <img
          src="/images/netflix.png"
          className="netflix-logo"
          alt="Netflix Logo"
        />
        <ul>
          <li>
            <a href="#" className="nav-link">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              Series
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              Films
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              Latest
            </a>
          </li>
          <li>
            <a href="#" className="nav-link">
              My List
            </a>
          </li>
        </ul>
      </div>

      <YouTube
        videoId={movieTrailerId}
        className="hero-video"
        containerClassName="hero"
        onReady={onPlayerReady}
        opts={{
          playerVars: {
            autoplay: 1,
            controls: 0,
          },
        }}
      />
      <div className="movie-list">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} onMovieClicked={onMovieClicked} />
        ))}
      </div>
    </div>
  );
}

export default App;
