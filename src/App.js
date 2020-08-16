import React, { useState, useEffect } from "react";
import "./App.scss";
import MovieRow from "./components/MovieRow";
import axios from "axios";
import fetchMovieTrailerId from "movie-trailer";
import YouTube from "react-youtube";
import Navbar from "./components/Navbar";

function App() {
  const [genres, setGenres] = useState([]);
  const [movieTrailerId, setMovieTrailerId] = useState("");
  const [movieTitle, setMovieTitle] = useState("");

  async function selectMovie(title) {
    try {
      const trailer_id = await fetchMovieTrailerId(title, {
        id: true,
      });

      setMovieTrailerId(trailer_id);
      setMovieTitle(title);
      window.scrollTo(0, 0);
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

      const genres = await res.data.genres;

      setGenres(genres);
    }
    getGenres();
  }, []);

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  return (
    <div className="app">
      <Navbar />

      <YouTube
        videoId={movieTrailerId}
        className="hero-video"
        containerClassName="hero"
        onReady={onPlayerReady}
        opts={{
          playerVars: {
            autoplay: 1,
            controls: 0,
            iv_load_policy: 3,
          },
        }}
      />
      <h1 className="movie-title">{movieTitle}</h1>
      <section className="movie-list">
        {genres.map((genre) => (
          <MovieRow key={genre.id} genre={genre} selectMovie={selectMovie} />
        ))}
      </section>
    </div>
  );
}

export default App;
