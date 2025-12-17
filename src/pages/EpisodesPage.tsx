import { useParams, Link } from "react-router-dom"; // AJOUTEZ Link
import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

export default function EpisodesPage() {
  const { id, saison } = useParams();
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !saison) return;
    
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${saison}?api_key=${apiKey}&language=fr-FR`
    )
      .then((r) => r.json())
      .then((d) => {
        setEpisodes(d.episodes || []);
        setLoading(false);
      })
      .catch(() => {
        setEpisodes([]);
        setLoading(false);
      });
  }, [id, saison]);

  if (loading) return <p className="loading">Chargement des épisodes...</p>;
  
  if (episodes.length === 0) return <p className="no-episodes">Aucun épisode disponible.</p>;

  return (
    <div className="episodes-container fade-in">
      <h1 className="episodes-title">Saison {saison} - Épisodes</h1>

      <div className="episodes-grid">
        {episodes.map((e) => (
          // AJOUTEZ CE LINK AUTOUR DE LA CARTE
          <Link 
            to={`/serie/${id}/saison/${saison}/episode/${e.episode_number}`}
            key={e.id}
            className="episode-card-link"
          >
            <div className="episode-card">
              <img
                src={
                  e.still_path 
                    ? `https://image.tmdb.org/t/p/w300${e.still_path}`
                    : "/placeholder-episode.jpg"
                }
                alt={e.name}
                className="episode-image"
              />
              <div className="episode-content">
                <h3 className="episode-title">
                  Épisode {e.episode_number}: {e.name}
                </h3>
                <p className="episode-overview">
                  {e.overview ? e.overview.substring(0, 120) + "..." : "Pas de description disponible."}
                </p>
                <div className="episode-meta">
                  <span className="episode-rating">
                    ⭐ {e.vote_average ? e.vote_average.toFixed(1) : "N/A"}/10
                  </span>
                  {e.air_date && (
                    <span className="episode-date">
                      {new Date(e.air_date).toLocaleDateString('fr-FR')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}