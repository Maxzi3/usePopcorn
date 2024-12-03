import { useEffect, useRef } from "react";

const Navbar = ({ query, setQuery }) => {
  const inputEL = useRef(null);
  useEffect(() => {
    const callback = (e) => {
      if (document.activeElement === inputEL.current) return;
      if (e.code === "Enter") {
        inputEL.current.focus();
        setQuery("");
      }
    };
    document.addEventListener("keypress", callback);
    return () => document.removeEventListener("keypress", callback);
  }, [setQuery]);
  // useEffect(() => {
  //   const el = document.querySelector(".search");
  //   el.focus();
  // }, []);
  return (
    <div>
      <nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          ref={inputEL}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="num-results">
          Found <strong>{query.length}</strong> results
        </p>
      </nav>
    </div>
  );
};

export default Navbar;
