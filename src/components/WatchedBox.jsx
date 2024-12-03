import React, { useState } from "react";
import SelectedMovie from "./SelectedMovie";

const WatchedBox = ({
  selectedId,
  handleSelectMovie,
  handleCloseMovie,
  handleAddWatched,
  watched,
  handleDeleteWatched,
}) => {
  const [isOpen2, setIsOpen2] = useState(true);

  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div>
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen2((open) => !open)}
        >
          {isOpen2 ? "–" : "+"}
        </button>

        {selectedId ? (
          // Show SelectedMovie if a selectedId exists
          <SelectedMovie
            selectedId={selectedId}
            handleCloseMovie={handleCloseMovie}
            handleAddWatched={handleAddWatched}
            watched={watched}
          />
        ) : (
          // Show WatchedBox content if no selectedId
          isOpen2 && (
            <>
              <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{avgRuntime.toFixed(2)} min</span>
                  </p>
                </div>
              </div>

              <ul className="list">
                {watched.map((movie) => (
                  <li key={movie.imdbID}>
                    <img src={movie.poster} alt={`${movie.title} poster`} />
                    <h3>{movie.title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                      </p>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteWatched(movie.imdbID)}
                      >
                        {" "}
                        X
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default WatchedBox;
