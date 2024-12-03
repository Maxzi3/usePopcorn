import React, { useState } from "react";
import MovieList from "./MovieList";
import Loader from "./Loader";

const ListBox = ({
  movies,
  isLoading,
  errmessage,
  error,
  handleSelectMovie,
}) => {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>

      {isOpen1 && (
        <div className="box">
          {/* Show loader when loading */}
          {isLoading && <Loader />}

          {/* Show error message if there's an error */}
          {error && <p className="error">{errmessage}</p>}

          {/* Show movie list if not loading and no error */}
          {!isLoading && !error && (
            <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />
          )}
        </div>
      )}
    </div>
  );
};

export default ListBox;
