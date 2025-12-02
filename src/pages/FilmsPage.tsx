import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function FilmsPage() {
  const navigate = useNavigate();
  const [films, setFilms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR`
      );
      const data = await res.json();
      setFilms(data.results || []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="movies-grid">
      {films.map((film) => (
        <div
          key={film.id}
          className="movie-card"
          onClick={() => navigate(`/film/${film.id}`)}  // ❤️ LE PLUS IMPORTANT
        >
          <img
            src={
              film.poster_path
                ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
                : "https://via.placeholder.com/220x330?text=No+Image"
            }
            alt={film.title}
          />
          <p>{film.title}</p>
        </div>
      ))}
    </div>
  );
}
