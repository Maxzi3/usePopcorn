import React from "react";

const Movie = ({ movie, handleSelectMovie }) => {
  return (
    <div>
      <li onClick={() => handleSelectMovie(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    </div>
  );
};

export default Movie;
