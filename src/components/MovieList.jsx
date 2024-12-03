import Movie from "./Movie";

const MovieList = ({ movies, handleSelectMovie }) => {
  return (
    <div>
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            handleSelectMovie={handleSelectMovie}
          />
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
