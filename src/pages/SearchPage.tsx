import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchMulti } from "../api/tmdb";

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const query = params.get("query") || "";

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) return;

    async function load() {
      const data = await searchMulti(query);
      setResults(data);
    }
    load();
  }, [query]);

  return (
    <div className="search-page">
      <h2>Résultats pour : {query}</h2>

      <div className="movies-grid">
        {results.map((item: any) => (
          <div
            key={item.id}
            className="movie-card"
            onClick={() => navigate(`/film/${item.id}`)}
          >
            <img
              src={
                item.poster_path
                  ? "https://image.tmdb.org/t/p/w500" + item.poster_path
                  : item.profile_path
                  ? "https://image.tmdb.org/t/p/w500" + item.profile_path
                  : "https://via.placeholder.com/220x330?text=No+Image"
              }
              alt={item.title || item.name}
            />
            <p>{item.title || item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
