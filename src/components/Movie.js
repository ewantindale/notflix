import React from "react";
import { GrPlayFill } from "react-icons/gr";

export default function Movie({ movie, selectMovie }) {
  function handleClick() {
    selectMovie(movie.title);
  }
  return (
    <div className="movie">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="image"
        alt={movie.title}
      />
      <div className="overlay"></div>
      <button className="play-button" onClick={handleClick}>
        <GrPlayFill />
      </button>
    </div>
  );
}
