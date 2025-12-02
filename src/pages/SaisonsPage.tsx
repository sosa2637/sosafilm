import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function SaisonsPage() {
  const { id } = useParams();
  const [serie, setSerie] = useState<any>(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=fr-FR`)
      .then((r) => r.json())
      .then((d) => setSerie(d));
  }, [id]);

  if (!serie) return <p className="loading">Chargement...</p>;

  return (
    <div className="season-container fade-in">
      <h1 className="season-title">{serie.name}</h1>

      <div className="season-grid">
        {serie.seasons.map((s) => (
          <Link
            to={`/serie/${id}/saison/${s.season_number}`}
            key={s.id}
            className="season-card"
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${s.poster_path}`}
              alt={s.name}
            />
            <h3>{s.name}</h3>
            <p>{s.episode_count} épisodes</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
