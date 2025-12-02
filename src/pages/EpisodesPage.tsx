import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function EpisodesPage() {
  const { id, saison } = useParams();
  const [episodes, setEpisodes] = useState<any>([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${saison}?api_key=${apiKey}&language=fr-FR`
    )
      .then((r) => r.json())
      .then((d) => setEpisodes(d.episodes));
  }, [id, saison]);

  if (!episodes) return <p className="loading">Chargement...</p>;

  return (
    <div className="episodes-container fade-in">
      <h1 className="episodes-title">Saison {saison}</h1>

      <div className="episodes-grid">
        {episodes.map((e) => (
          <div key={e.id} className="episode-card">
            <img
              src={`https://image.tmdb.org/t/p/w300${e.still_path}`}
              alt={e.name}
            />
            <h3>{e.episode_number}. {e.name}</h3>
            <p>{e.overview}</p>
            <span className="episode-note">⭐ {e.vote_average}/10</span>
          </div>
        ))}
      </div>
    </div>
  );
}
