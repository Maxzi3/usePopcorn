import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import { useLoaclStorage } from "./components/useLocalStorage";
const KEY = "9b2d4d23";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("inception");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLoaclStorage(KEY, "watched", []);
  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setError("");
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(
            "There was an error fetching the data from the API:",
            error
          );
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    handleCloseMovie();
    fetchMovies();
    return () => {
      controller.abort();
    };
  }, [query]);

  const handleSelectMovie = (id) => {
    setSelectedId(id);
  };
  const handleCloseMovie = () => {
    setSelectedId(null);
  };
  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };
  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      <Main
        isLoading={isLoading}
        movies={movies}
        errmessage={error}
        error={error}
        selectedId={selectedId}
        handleSelectMovie={handleSelectMovie}
        handleCloseMovie={handleCloseMovie}
        handleAddWatched={handleAddWatched}
        handleDeleteWatched={handleDeleteWatched}
        watched={watched}
      />
    </>
  );
}
