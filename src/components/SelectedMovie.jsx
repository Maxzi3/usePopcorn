import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
const SelectedMovie = ({
  selectedId,
  handleCloseMovie,
  handleAddWatched,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [Loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: realeased,
    Actors: actor,
    Director: director,
    Genre: genre,
  } = movie;
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=9b2d4d23&i=${selectedId}`
        );
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data = await res.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false); // Ensure loading is false regardless of error
      }
    };
    fetchMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);
 useEffect(
   function () {
     function callback(e) {
       if (e.code === "Escape") {
         handleCloseMovie();
       }
     }

     document.addEventListener("keydown", callback);

     return function () {
       document.removeEventListener("keydown", callback);
     };
   },
   [handleCloseMovie]
 );

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime?.split(" ").at(0) || 0),
      userRating,
    };
    handleAddWatched(newWatchedMovie);
    handleCloseMovie();
  };
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserrating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  return (
    <div className="details">
      {Loading ? (
        <header className="summary">
          <Loader />
        </header>
      ) : (
        <>
          {" "}
          <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{realeased}</p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating}
                IMDB Rating
              </p>
            </div>
          </header>
          <section>
            <p>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating
                      maxRating={10}
                      color="#fcc419"
                      size={24}
                      setUserRating={setUserRating}
                    />
                    {userRating > 0 && (
                      <button className="btn-add" onClick={handleAdd}>
                        + Add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p>You rated this movie {watchedUserrating} ⭐</p>
                )}
              </div>
              {userRating && <p>Your Rating: {userRating}</p>}
              <em>{plot}</em>
            </p>
            <p>Starring {actor}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default SelectedMovie;
