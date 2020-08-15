import React from "react";

export default function Movie({ movie, onMovieClicked }) {
  function handleClick() {
    onMovieClicked(movie);
  }
  return (
    <div className="movie" onClick={handleClick}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        className="image"
        alt={movie.title}
      />
      <div className="overlay"></div>
      <div className="info">
        <p className="title">{movie.title}</p>
      </div>
    </div>
  );
}
