import React from "react";
import ListBox from "./ListBox";
import WatchedBox from "./WatchedBox";

const Main = ({
  movies,
  isLoading,
  errmessage,
  error,
  selectedId,
  handleSelectMovie,
  handleCloseMovie,
  handleAddWatched,
  handleDeleteWatched,
  watched,
}) => {
  return (
    <div>
      <main className="main">
        <ListBox
          movies={movies}
          isLoading={isLoading}
          errmessage={errmessage}
          error={error}
          handleSelectMovie={handleSelectMovie}
          handleCloseMovie={handleCloseMovie}
        />
        <WatchedBox
          selectedId={selectedId}
          handleSelectMovie={handleSelectMovie}
          handleCloseMovie={handleCloseMovie}
          handleAddWatched={handleAddWatched}
          handleDeleteWatched={handleDeleteWatched}
          watched={watched}
        />
      </main>
    </div>
  );
};

export default Main;
